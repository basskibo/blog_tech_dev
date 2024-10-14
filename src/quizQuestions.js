import { IoLogoNodejs } from "react-icons/io";
import { nodejs_1_questionList, nodejs_2_questionList } from "./questions/nodejs_1";
import { IoLogoReact } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import { reactjs_1_questionList } from "./questions/reactjs_1";
import { mongodb_1_questionList } from "./questions/mongodb_1";

export const nodeQuestions = [
	{
		id: 'nodejs_1',
		name: 'Nodejs',
		icon: <IoLogoNodejs size={'2rem'} />,
		level: 'Junior',
		difficulty: 2,
		questions: nodejs_1_questionList
	},
	{
		id: 'nodejs_2',
		name: 'Nodejs',
		icon: <IoLogoNodejs size={'2rem'} />,
		level: 'Senior',
		difficulty: 4,
		questions: nodejs_2_questionList
	}
]

export const reactQuestions = [
	{
		id: 'reactjs_1',
		name: 'React',
		icon: <IoLogoReact size={'2rem'} />,
		level: 'Senior',
		difficulty: 5,
		questions: reactjs_1_questionList
	},
]

export const mongodbQuestions = [
	{
		id: 'mongodb_1',
		name: 'MongoDB',
		icon: <SiMongodb size={'2rem'} />,
		level: 'Junior',
		difficulty: 2,
		questions: mongodb_1_questionList
	},
]


export const allQuizes = [ ...nodeQuestions, ...reactQuestions, ...mongodbQuestions]