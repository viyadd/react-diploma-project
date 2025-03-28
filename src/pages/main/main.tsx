import { Dialog, Input, PrivateContent, Select } from '@/components';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
	AppComponentsPropsBase,
	DataBaseProjectShortData,
	DataBaseTaskData,
	DialogType,
	isApiDataPageDescriptor,
	isValueServerResponseErrorData,
} from '@/types';
import { AppUserRole } from '@/constants';
import {
	pushSnackbarMessage,
	request,
	transformProjectsToOptionList,
	transformTasksToOptionList,
} from '@/utils';
import {
	selectAppUserIdentified,
	selectIsProjectListLoading,
	selectIsTaskListLoading,
} from '@/selectors';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import { setProjectListLoading, setTaskListLoading } from '@/actions';
import { FSMOfSpentTimeHendeleOnStateChangeFunc, useFSMOfSpentTime } from '@/hooks';
import { SpentTimeControl } from './components';
import { useUserRights } from '@/hooks/use-user-rights';

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const availableStatuses = ['backlog', 'doing', 'review', ''];

const MainContainer = ({ className }: AppComponentsPropsBase) => {
	const [comment, setComment] = useState<string | null>(null);
	const [projectList, setProjectList] = useState<DataBaseProjectShortData[] | null>(null);
	const [currentProject, setCurrentProject] = useState<DataBaseProjectShortData | null>(
		null,
	);
	const [taskList, setTaskList] = useState<DataBaseTaskData[] | null>(null);
	const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
	const [isShowSaveDialog, setIsShowSaveDialog] = useState(false);
	const [saving, setSaving] = useState(false);

	const isProjectListLoading = useAppSelector(selectIsProjectListLoading);
	const isTaskListLoading = useAppSelector(selectIsTaskListLoading);
	const isIdentified = useAppSelector(selectAppUserIdentified);

	const fsmSpentTime = useFSMOfSpentTime();
	const usersRights = useUserRights();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isIdentified) {
			return;
		}
		dispatch(setTaskListLoading(false));
		dispatch(setProjectListLoading(true));
		request('/projects?projection=ShortList').then((loadedProjects) => {
			const { error, data } = loadedProjects;
			if (isValueServerResponseErrorData(error)) {
				pushSnackbarMessage.errorServerApi(error);
			}

			if (data !== undefined && data !== null) {
				const projecs = data as DataBaseProjectShortData[];
				setProjectList(projecs);
			}
			dispatch(setProjectListLoading(false));
		});
	}, [dispatch, isIdentified]);

	useEffect(() => {
		if (currentProject === null) {
			return;
		}
		dispatch(setTaskListLoading(true));
		const tasks = currentProject.tasks.map((task) => {
			return typeof task === 'string' ? task : task.id;
		});
		if (tasks.length < 1) {
			setTaskList(null);
			dispatch(setTaskListLoading(false));
			return;
		}
		const url = `/tasks?id=${tasks.join('&id=')}&limit=999`;
		request(url).then((loadedTasks) => {
			const { error, data } = loadedTasks;
			if (isValueServerResponseErrorData(error)) {
				pushSnackbarMessage.errorServerApi(error);
			}
			if (data !== undefined && data !== null && isApiDataPageDescriptor(data)) {
				const tasks = data.content as DataBaseTaskData[];
				setTaskList(tasks);
			} else {
				setTaskList(null);
			}
			dispatch(setTaskListLoading(false));
		});
	}, [currentProject, dispatch]);

	const createSpentTime = async () => {
		if (currentTaskId === null) {
			setSaving(false);
			return;
		}
		const url = `/tasks/${currentTaskId}/spent-time`;
		const data = {
			comment,
			startedAt: fsmSpentTime.getStartDate().toISOString(),
			duration: Math.floor(fsmSpentTime.workTime / 60000),
		};
		const savedSpendTime = await request(url, 'POST', data);
		if (savedSpendTime.error) {
			pushSnackbarMessage.errorServerApi(savedSpendTime.error);
			setSaving(false);
			return;
		}
		pushSnackbarMessage.success('Данные успешно сохранены');
		setSaving(false);
	};

	const getProjectById = (id: string, projectList: DataBaseProjectShortData[] | null) => {
		if (projectList === null) {
			return null;
		}

		const project = projectList.find((project) => project.id === id);
		if (project === undefined) {
			return null;
		}
		return project;
	};

	const handleOnCommentChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setComment(e.target.value);
	};

	const handleOnControlClick: FSMOfSpentTimeHendeleOnStateChangeFunc = (key) => {
		if (key === 'stop' && (comment === null || comment.trim().length === 0)) {
			pushSnackbarMessage.error(
				'Для завершения работы необходимо заполнить поле комментария.',
			);
			return;
		}
		if (key === 'stop') {
			setIsShowSaveDialog(true);
			return;
		}
		fsmSpentTime.handleOnStateChange(key);
	};

	const handleSaveConfirmed = () => {
		setIsShowSaveDialog(false);
		fsmSpentTime.handleOnStateChange('stop');
		setSaving(true);
		pushSnackbarMessage.info('Соъранение данных');
		createSpentTime();
	};

	const isTaskSelected = currentTaskId !== null;

	return (
		<PrivateContent access={accessRoles}>
			{usersRights.isAccessGranted(accessRoles) && (
				<div className={className}>
					<div className="main-form">
						<SpentTimeControl
							fsmState={fsmSpentTime.state}
							timeWork={fsmSpentTime.workTime}
							timePause={fsmSpentTime.pauseTime}
							disabled={!isTaskSelected || saving}
							onControlClick={handleOnControlClick}
						/>
						<Select
							placeholder="Проект"
							optionsList={transformProjectsToOptionList(projectList || [])}
							loading={isProjectListLoading}
							disabled={saving}
							onChange={(e) => {
								setCurrentProject(getProjectById(e.target.value, projectList));
								setCurrentTaskId(null);
							}}
						/>
						<Select
							placeholder="Задача"
							optionsList={transformTasksToOptionList(
								(taskList || []).filter((task) =>
									availableStatuses.includes(task.state.code),
								),
							)}
							loading={isTaskListLoading}
							disabled={!(Array.isArray(taskList) && taskList.length > 0) || saving}
							defaultValue=""
							onChange={(e) => setCurrentTaskId(e.target.value)}
						/>
						<Input
							type="text"
							placeholder="Комментарий"
							disabled={saving}
							onChange={handleOnCommentChange}
						/>
					</div>
				</div>
			)}
			<Dialog
				open={isShowSaveDialog}
				type={DialogType.YesNo}
				onClose={() => setIsShowSaveDialog(false)}
				onConfirm={handleSaveConfirmed}
			>
				Создать запись о выполненой работе?
			</Dialog>
		</PrivateContent>
	);
};

export const Main = styled(MainContainer)`
	margin: 0;
	display: flex;
	justify-content: center;
	place-items: center;
	min-width: 320px;
	min-height: 93vh;

	& .main-form {
		display: flex;
		width: 600px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}

	& .player-buttons {
		display: flex;
		font-size: 53px;
	}
`;
