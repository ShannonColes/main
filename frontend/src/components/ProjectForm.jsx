import { useState } from 'react'

const ProjectForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const project = {title, description, imageURL}
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

        <label>Image:</label>
        <input
            type="text"
            onChange={(e) => setImageURL(e.target.value)}
            value={reps}
        />

        <button>Add Project</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ProjectForm