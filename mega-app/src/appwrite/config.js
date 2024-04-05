import conf from '../config.js'
import {Client,Databases, Storage, Query} from 'appwrite'


export class Service{
    client =  new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createDocument({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            return error
        }
    }

    async updateDocument(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            return error
        }
    }


    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId,
                slug,
            )
            return true;
        } catch (error) {
            return error
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId,
                slug,
            )
        } catch (error) {
            return error
        }
    }

    async getAllPosts([queries = [Query.equal("status", "active")]]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId,
                queries
            )
        } catch (error) {
            return error
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            return error
        }
    }


    async deleteFile(fileId){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            return error
        }
    }


    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            return error
        }
    }

    
}

const service = new Service();
export default service;