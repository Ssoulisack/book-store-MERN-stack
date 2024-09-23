import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

function EditBook() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    // useEffect(()=>{ //Promise style
    //     setLoading(true)
    //     axios.get(`http://localhost:8000/books/${id}`)
    //     .then((response)=>{
    //         setTitle(response.data.title)
    //         setAuthor(response.data.author)
    //         setPublishYear(response.data.publishYear)
    //         setLoading(false)
    //     })
    //     .catch((error)=>{
    //         alert('An error happened. Please Check console');
    //         console.log(error);
    //     })
    // }, [])
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/books/${id}`);
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            } catch (error) {
                setLoading(false);  // Ensure loading is stopped in case of an error
                // alert('An error happened. Please check the console.');
                enqueueSnackbar('Error', {variant: 'error'})
                console.log(error);
            }
        };

        fetchBookData();  // Call the async function inside the useEffect
    }, []);  // Include 'id' as a dependency to avoid potential warnings

    const handleEditBook = async () => { //Update a Book
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
            try{
                await axios.put(`http://localhost:8000/books/${id}`, data)
                setLoading(false);
                enqueueSnackbar('Book Edited successfully', { variant: 'success' })
                navigate('/');
            }
            catch(error){
                setLoading(false);
                // alert('An error happened. please Check console');
                enqueueSnackbar('Error', {variant: 'error'})
                console.log('something wrong with ', error);
            }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className="my-4">
                    <label htmlFor="Title" className='text-xl text-gray-500'>Title</label>
                    <input type="text"
                        value={title} onChange={(e) => { setTitle(e.target.value) }}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label htmlFor="Author" className='text-xl text-gray-500'>Author</label>
                    <input type="text"
                        value={author} onChange={(e) => { setAuthor(e.target.value) }}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label htmlFor="Publish Year" className='text-xl text-gray-500'>Publish Year</label>
                    <input type="number"
                        value={publishYear} onChange={(e) => { setPublishYear(e.target.value) }}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
            </div>
        </div>
    )
}

export default EditBook