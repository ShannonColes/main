import { createContext, useReducer} from "react";

export const ProjectsContext = createContext()

export const projectsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                projects: action.payload
            }
        case 'CREATE_WORKOUTS':
            return{
                projects: [action.payload, ...state.projects]
            }
        default:
            return state
    }
}

export const ProjectsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(projectsReducer, {
        projects: null
    })


    return (
        <ProjectsContext.Provider value={{...state,dispatch}}>
            {children}
        </ProjectsContext.Provider>
    )
}