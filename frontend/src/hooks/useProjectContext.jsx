import { ProjectsContext } from "../context/projectsContext";
import { useContext } from "react";

export const useProjectContext = () => {
    const context = useContext(ProjectsContext)

    if (!context) {
        throw Error ('useWorkoutsContext hook must be used inside WorkoutsContextProvider')
    }

    return context
}