import conf from "../conf/conf";
import { Client, Databases, ID } from "appwrite";

export class Service {
	client = new Client();
	databases;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
	}

	async createTodo({ task }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{
					task: task,
					isCompleted: false,
				}
			);
		} catch (error) {
			console.log("Appwrite Service :: createTodo :: Error :: ", error);
		}
	}

	async updateTodo(id, text, isCompleted) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				id,
				{ task: text, isCompleted: isCompleted }
			);
		} catch (error) {
			console.log("Appwrite Service :: updateTodo :: Error :: ", error);
		}
	}

	async deleteTodo(id) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				id
			);
			return true;
		} catch (error) {
			console.log("Appwrite Service :: deleteTodo :: Error :: ", error);
			return false;
		}
	}

	async getTodos() {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId
			);
		} catch (error) {
			console.log("Appwrite Service :: getTodos :: Error :: ", error);
		}
	}
}

const service = new Service();

export default service;
