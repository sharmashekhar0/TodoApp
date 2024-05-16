import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				this.login({ email, password });
				return userAccount;
			} else {
				userAccount;
			}
		} catch (error) {
			console.log(
				"Appwrite Service :: CreateAccount :: Error :: ",
				error
			);
		}
	}

	async login({ email, password }) {
		try {
			console.log("Account :: ", this.account);
			return await this.account.createEmailPasswordSession(
				email,
				password
			);
		} catch (error) {
			console.log("Appwrite Service :: Login :: Error :: ", error);
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log(
				"Appwrite Service :: getCurrentUser :: Error :: ",
				error
			);
		}
	}

	async logout() {
		try {
			return this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite Service :: logout :: Error :: ", error);
		}
	}
}

const authService = new AuthService();

export default authService;
