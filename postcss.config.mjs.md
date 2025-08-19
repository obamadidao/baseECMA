///////////////////////////////////////////////////////App.jsx
  return (
    <>
      <nav style={{
        display: 'flex',
        gap: '20px',
        backgroundColor: '#005f73',
        padding: '15px 30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
    <Link to="books" style={linkStyle}>danh sach</Link>
    <Link to="books/Add" style={linkStyle}>them</Link>
    <Link to="Register" style={linkStyle}>dang ky</Link>
    <Link to="Login" style={linkStyle}>dang nhap</Link>
      </nav>
      <Routes>
    <Route path='/books' Component={List}/>
    <Route path='/books/Add' Component={Add}/>
    <Route path='/books/Edit/:id' Component={Edit}/>
    <Route path='/Register' Component={Register}/>
    <Route path='/Login' Component={Login}/>
      </Routes>
    </>
  )
///////////////////////////////////////////////////////List.jsx
 const [books, setBook] = useState([])
    const bookservice = new CRUD('books')
    useEffect(()=>{
      bookservice.getAll(setBook)
    },[])
    const onDelete = async(id)=>{
      try{
        if(confirm("chac chu")){
          bookservice.Delete(id)
        }
      }catch(error){
        console.log(error);
      }
    }
return (
<div>
<h1>Danh sách</h1>
<table>
<thead>
<tr>
<th>STT</th>
<th>Ten sach</th>
<th>Nam xb</th>
<th>Gia tien</th>
<th>Thao tac</th>
</tr>
</thead>
<tbody>
{books.length>0&&books.map((item,index)=>(
<tr key={item.id}>
<td>{index+1}</td>
<td>{item.tensach}</td>
<td>{item.namxb}</td>
<td>{item.giatien}</td>
<td>{item.tacgia}</td>
<td>
<a href={`/books/Edit/${item.id}`}>Sua</a>
<button onClick={()=>onDelete(item.id)}>Xoa</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
///////////////////////////////////////////////////////List.jsx
const [books, setBook] = useState([])
    const navigate = useNavigate()
    const bookservice = new CRUD('books')
    const onSubmit = async (e)=>{
        e.preventDefault()
if (books.tensach==undefined||
books.tensach==''){
            alert('Ten khong duoc de trong')
            return;
        }
if (books.namexb==undefined||
(!isNaN(books.namxb)&&books.namxb>2024)){
          alert("Nam xuat ban < 2025")
          return;
        }
try{
          bookservice.Post(books)
          navigate('books')
          alert("Them moi thanh cong")
} catch(error){
          alert(" them moi that bai")
        }
    }
  return (
    <div>
        <h1>Thêm</h1>
<form onSubmit={onSubmit}>
<input onChange={(e)=>
setBook({...books,tensach:e.target.value})}
 type="text" placeholder='Ten sach'/>
 <input onChange={(e)=>
 setBook({...books,namxb:e.target.value})}
 type="text" placeholder='Nam xuat ban'/>
 <input onChange={(e)=>
 setBook({...books,giatien:e.target.value})}
 type="text" placeholder='Gia tien'/>
 <input onChange={(e)=>
 setBook({...books,tacgia:e.target.value})}
 type="text" placeholder='Tac gia'/>
 
<button>Them moi</button>
</form>
    </div>
  )
///////////////////////////////////////////////////////Register.jsx
const [user, setUser] = useState([])
const navigate = useNavigate()
const userservice = new CRUD('Register')
const onSubmit = async (e)=>{
        e.preventDefault()
        if (user.email==undefined||
        user.email.indexOf('@')==-1||
        user.email.indexOf('.')==-1){
            alert('Email khong hop le')
            return;
        }
if (user.password==undefined||
        user.password==length<6){
          alert("Mat khau > 6 ky tu")
          return;
        }
try{
        await  userservice.Post(user)
          navigate('/Login')
          alert("dang ky thanh cong")
} catch(error){
          alert("dang ky that bai")
        }
    }
  return (
    <div>
  <h1>Đăng ký</h1>
<form onSubmit={onSubmit}>
<input onChange={(e)=>
setUser({...user,email:e.target.value})}
 type="text" placeholder='Email'/>
 <input onChange={(e)=>
 setUser({...user,password:e.target.value})}
 type="text" placeholder='Password'/>
 
<button>dang ky</button>
</form>
    </div>
  )
///////////////////////////////////////////////////////Login.jsx
const [user, setUser] = useState([])
    const navigate = useNavigate()
    const userservice = new CRUD('Login')
    const onSubmit = async (e)=>{
        e.preventDefault()
if (user.email==undefined||
user.email.indexOf('@')==-1||
user.email.indexOf('.')==-1){
            alert('Email khong hop le')
            return;
        }
if (user.password==undefined||
user.password==length<6){
          alert("Mat khau > 6 ky tu")
          return;
        }
try{
    const data = await userservice.Post(user)
localStorage.setItem('token',data.accessToken)
          navigate('/List')
          alert("dang nhap thanh cong")
} catch(error){
          alert("dang nhap that bai")
        }
    }
  return (
    <div>
  <h1>Đăng nhap</h1>
<form onSubmit={onSubmit}>
<input onChange={(e)=>
setUser({...user,email:e.target.value})}
 type="text" placeholder='Email'/>
 <input onChange={(e)=>
 setUser({...user,password:e.target.value})}
 type="text" placeholder='Password'/>
 
<button>dang nhap</button>
</form>
    </div>
  )
}
////////////////////////////////////crud.jsx trong folder services
import axios from "axios"

class CRUD{
    constructor(collection){
        this.API_URL = `http://localhost:3000/${collection}`
    }
    getAll = async(setData)=>{
        try {
            const {data} = await
             axios.get(this.API_URL)
            setData(data)
        } catch (error) {
            throw error
        }
    }
    Post = async(postdata)=>{
        try {
            const {data} = await
             axios.post(this.API_URL,postdata)
            return data
        } catch (error) {
            throw error
        }
    }
    Put = async (postdata,id)=>{
        try {
            const {data} = await
             axios.put(this.API_URL+`/${id}`,postdata)
            return data
        } catch (error) {
            throw error
        }
    }
    GetById = async(id,setData)=>{
        try {
            const {data} = await
             axios.get(this.API_URL+`/${id}`)
            setData(data)
        } catch (error) {
            throw error
        } 
    }
    Delete = async(id)=>{
          try {
            const {data} = await
             axios.delete(this.API_URL+`/${id}`)
            return data
        } catch (error) {
            throw error
        } 
    }
}
export default CRUD