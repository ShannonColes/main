import { useState } from 'react'

const ProjectForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const project = {title, description}
        try {
            const response = await axios.post('http://localhost:4000/api/projects', project, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setTitle('')
            setDescription('')
            setImageURL('')
            setError(null)
            console.log('new project added', response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const [error, setError] = useState(null)

  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Project</h3>

        <label>Project Title:</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <label>Description:</label>
        <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
        />

        <label>Upload Image:</label>
        <input 
            type='file' 
            accept='image/*' 
            onChange={(e) => setImage(e.target.files[0])} 
        />

        <button>Add Project</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ProjectForm