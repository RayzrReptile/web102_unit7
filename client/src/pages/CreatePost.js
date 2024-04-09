import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import './CreatePost.css'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", author: "", description: ""})

    const updateTestFields = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title, author: post.author, description: post.description})
          .select();
      
        window.location = "/";
    }

    return (
        <div>
            <form>
                <label for="title">Title</label><br />
                <input type="text" id="title" name="title" onChange={updateTestFields} /><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" onChange={updateTestFields} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" name="description" id="description" onChange={updateTestFields}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost