import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import './EditPost.css'

const EditPost = () => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""});
    const [priorPost, setPriorPost] = useState({id: null, title: "", author: "", description: ""});

    useEffect(() => {
        // Fetch prior data
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .eq('id', id);

            // set state of posts
            setPriorPost(data);
    }

    fetchPosts();
    }, [])


    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    const updatePost = async (event) => {
        event.preventDefault();

        //checkParams();

        for (const [key, value] of Object.entries(post)) {
            if (value == "") {
              post[key] = priorPost[0][key];
            }
        }

        console.log(post);
        debugger;
        await supabase
        .from('Posts')
        .update({ title: post.title, author: post.author,  description: post.description})
        .eq('id', id);

        window.location = "/";
    }

    return (
        <div>
            <form>
                {priorPost[0] ? (
                    <>
                        <label for="title">Title</label> <br />
                        <input type="text" id="title" name="title" value={post.title} onChange={handleChange} placeholder={priorPost[0].title}/><br />
                        <br/>

                        <label for="author">Author</label><br />
                        <input type="text" id="author" name="author" value={post.author} onChange={handleChange} placeholder={priorPost[0].author}/><br />
                        <br/>

                        <label for="description">Description</label><br />
                        <textarea rows="5" cols="50" name="description" id="description" value={post.description} onChange={handleChange} placeholder={priorPost[0].description}>
                        </textarea>
                        <br/>
                        <input type="submit" value="Submit" onClick={updatePost}/>
                        <button className="deleteButton">Delete</button>
                    </>
                    ) : null
                }
            </form>
        </div>
    )
}

export default EditPost