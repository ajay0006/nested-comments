import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";

// this is a custom hook
// instead of always having to re-type the useEffect in multiple places in our project
// i can basically create it here and re-use it everywhere in my application
// keep in mind this will always be an async code, because we are constantly pulling data from the server
// there are 2 types of the functions
// 1. that fires automatically when the user performs a task, such as adding comments etc
// 2. one that fires automatically when there is a change to dependencies

// this function runs everytime the execute function changes
export function useAsync(func, dependencies = []) {
    // this function is the entry point
    // if there are no dependencies we set it to an empty array
    // notice i am calling the internal function, and guess what it returns?
    // the state (loading, error and Value) as well as the function and generates our state, brilliant right
    const { execute, ...state } = useAsyncInternal(func, dependencies, true)

    // we have our data, but what if something changes, well thats why the execute function has been set as our dependency, so the function will re-run
    useEffect(() => {
        execute()
    }, [execute])

    return state
}
// this function is the same as the one above, only difference is it returns a function, basically calling the 3rd function below
export function useAsyncFn(func, dependencies = []) {
    return useAsyncInternal(func, dependencies, false)

}
// this is a function that does not get called anywhere else but inside this file
export function useAsyncInternal(func, dependencies = [], initialLoading = false) {
    const [loading, setLoading] = useState(initialLoading)
    const [error, setError] = useState()
    const [value, setValue] = useState()

    // this execute function is what does the heavy lifting
    const execute = useCallback((...params) => {
        // because we have started loading the data, we set the value to loading ...
        setLoading(true)
        // after the loading begins, we run the function that does the actual fetching of the data
        return func(...params).then(data => {
            // because we now have the data but no errors we set the error variable to undefined and the value to the returned data
            setValue(data)
            setError(undefined)
            return data
            // if we do get an error, that means we wont be getting any returned data but instead we will be returning an error and setting the value to undefined
        }).catch(error => {
            setValue(undefined)
            setError(error)
            return Promise.reject(error)
            // when thats done we set the loading status back to false
        }).finally(() => {
            setLoading(false)
        })
        // the execute function only ever re-reruns if the dependencies change state
    }, dependencies)
    return { loading, error, value, execute}
}