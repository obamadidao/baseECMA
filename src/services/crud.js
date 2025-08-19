import axios from "axios"

class CRUD{
    constructor(collection){
        this.API_URL = `http://localhost:3000/${collection}`
    }
    getAll = async(setData)=>{
        try {
            const {data} = await axios.get(this.API_URL)
            setData(data)
        } catch (error) {
            throw error
        }
    }
    Post = async(postdata)=>{
        try {
            const {data} = await axios.post(this.API_URL,postdata)
            return data
        } catch (error) {
            throw error
        }
    }
    Put = async (postdata,id)=>{
        try {
            const {data} = await axios.put(this.API_URL+`/${id}`,postdata)
            return data
        } catch (error) {
            throw error
        }
    }
    GetById = async(id,setData)=>{
        try {
            const {data} = await axios.get(this.API_URL+`/${id}`)
            setData(data)
        } catch (error) {
            throw error
        } 
    }
    Delete = async(id)=>{
          try {
            const {data} = await axios.delete(this.API_URL+`/${id}`)
            return data
        } catch (error) {
            throw error
        } 
    }
}
export default CRUD