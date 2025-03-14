import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormError, Input, PageTitle, Select } from '@/components';
import {
	AppComponentsPropsBase,
	DataBaseProjectData,
	DataBaseStateData,
} from '@/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	request,
	serverErrorToString,
	transformAppStateToOptionList,
} from '@/utils';

const pageTittleList = ['Новый проект', 'Редактировать проект'];

const projectFormSchema = yup.object().shape({
	title: yup.string().required('Заполните заголовок'),
	description: yup.string().required('Заполните описание'),
	state: yup.string().required('Заполните статус'),
});

interface EditProjectProps extends AppComponentsPropsBase {
	isNew: boolean;
	id?: string;
}

const EditProjectContainer = ({ className, isNew, id }: EditProjectProps) => {
	const [projectTitle, setProjectTitle] = useState<string | undefined>();
	const [projectDescription, setProjectDescription] = useState<string | undefined>();
	const [projectStateId, setProjectStateId] = useState<string | undefined>();
	const [isChanged, setIsChanged] = useState(false);
	const [project, setProject] = useState<DataBaseProjectData | null>(null);
	const [stateList, setStateList] = useState<DataBaseStateData[] | null>(null);
	const [serverError, setServerError] = useState<string | null>(null);

	const navigate = useNavigate();

	const {
		register,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: useMemo(() => {
			return {
				title: typeof projectTitle === 'string' ? projectTitle : '',
				description: typeof projectDescription === 'string' ? projectDescription : '',
				state: typeof projectStateId === 'string' ? projectStateId : '',
			};
		}, [projectTitle, projectDescription, projectStateId]),
		resolver: yupResolver(projectFormSchema),
	});

	const fetchProjectAndStates = (id: string) =>
		Promise.all([request(`/projects/${id}`), request(`/states`)]);

	useEffect(() => {
		reset({
			title: projectTitle,
			description: projectDescription,
			state: projectStateId,
		});
	}, [projectDescription, projectStateId, projectTitle, reset]);

	useEffect(() => {
		if (!isNew && id !== undefined) {
			fetchProjectAndStates(id).then(([projectData, statesData]) => {
				if (projectData.error) {
					setServerError(serverErrorToString(projectData.error));
					return;
				}

				if (projectData.data !== null) {
					const { title, description, state } = projectData.data as DataBaseProjectData;
					setProjectTitle(title);
					setProjectDescription(description);
					setProjectStateId(state.id);
					setProject(projectData.data as DataBaseProjectData);
				}
				if (statesData.data !== null) {
					setStateList(statesData.data as DataBaseStateData[]);
				}
			});
		}
		if (isNew) {
			request('/states').then((loadedStates) => {
				if (loadedStates.error) {
					setServerError(serverErrorToString(loadedStates.error));
					return;
				}
				if (loadedStates.data !== null) {
					const statesData = loadedStates.data as DataBaseStateData[];
					setStateList(statesData);
					setProjectStateId(statesData?.[0]?.id);
				}
			});
		}
	}, [id, isNew]);

	useEffect(() => {
		const subscription = watch((value) => {
			const { title, description, state } = value;
			setIsChanged(
				projectTitle !== title ||
					projectDescription !== description ||
					projectStateId !== state,
			);
		});
		return () => subscription.unsubscribe();
	}, [projectDescription, projectStateId, projectTitle, watch]);

	const onSubmit = ({
		title,
		description,
		state,
	}: Record<'title' | 'description' | 'state', string>) => {
		setServerError(null);
		const method = !isNew && project && project.id ? 'PATCH' : 'POST';

		const urlId = !isNew && project && project.id ? `/${project.id}` : '';

		request(`/projects${urlId}`, method, {
			title,
			description,
			state,
		}).then((loadedProject) => {
			if (loadedProject.error) {
				setServerError(serverErrorToString(loadedProject.error));
				return;
			}
			const project = loadedProject.data as DataBaseProjectData;
			navigate(`/project/${project.id}`);
		});
	};

	const formError =
		errors?.title?.message || errors?.description?.message || errors?.state?.message;
	const errorMessage = serverError || formError;

	return (
		<div className={className}>
			<PageTitle>{pageTittleList[isNew ? 0 : 1]}</PageTitle>
			<div>
				<Input
					type="text"
					placeholder="Название"
					{...register('title', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="text"
					placeholder="Описание"
					{...register('description', {
						onChange: () => setServerError(null),
					})}
				/>
				<Select
					optionsList={transformAppStateToOptionList(stateList || [])}
					{...register('state', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button onClick={handleSubmit(onSubmit)} disabled={!!formError || !isChanged}>
					Сохранить
				</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</div>
		</div>
	);
};

export const EditProject = styled(EditProjectContainer)`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
