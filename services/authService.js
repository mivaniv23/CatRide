import {account, database, config } from "./appwrite";
import {ID} from 'react-native-appwrite';

const authService = {
    
    async register(email, password, name) {
        try {
          //Try to log out if a session is already active
     
          // 1. Create Appwrite account
          const user = await account.create(ID.unique(), email, password, name);
      
          // 2. Auto-login (now safe)
          await account.createEmailPasswordSession(email, password);
      
          // 3. Create user profile doc in DB
          await database.createDocument(
            config.db,
            config.col.user,
            user.$id,
            {
              name: name,
              email: email,
              points: 0,
              totalRides: 0,
              avatar: '',
            }
          );
          return user;
        } catch (error) {
          return {
            error: error.message || 'Registration failed. Please try again',
          };
        }
      },

    async login(email, password) {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            return {
                error: error.message || 'Login failed. Please check your credentials'
            }
        }

    },

    //get logged in user
    async getUser() {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },

    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            return {
                error: error.message || "Logout failed. Please try again"
            }
        }
    }

}

export default authService;