import { useState, useEffect,useCallback } from "react";

// const useFetch = (props) => {
// 	console.log("prps ===>>>", props)
// 	const api = `http://10.10.1.72:8080/api/v1/login`
// 	const [data, setData] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(false);

// 	useEffect(() => {
// 		setLoading(true);
// 		fetch(api,{
// 			method: 'POST', // *GET, POST, PUT, DELETE, etc.
// 			mode: 'cors', // no-cors, *cors, same-origin
// 			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
// 			credentials: 'same-origin', // include, *same-origin, omit
// 			headers: {
// 			  'Content-Type': 'application/json'
// 			  // 'Content-Type': 'application/x-www-form-urlencoded',
// 			},
// 			redirect: 'follow', // manual, *follow, error
// 			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// 			body: JSON.stringify(props)
// 		}).then((res) => res.json()).then((res) => {
// 			setData(res);
// 		}).catch((error) => {
// 			setError(error.message);
// 		}).finally(() => setLoading(false));
// 	}, []);

// 	return { data, loading, error };

// };

// export default useFetch;

export default function useFetch(url, { immediate }) {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(false)
  
	const executeFetch = useCallback(async (values) => {
		console.log("Called ===>>>")
	  setIsPending(true)
	  setData(null)
	  setError(null)
	  let options = {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(values)
	}
	  await fetch(url, options)
		.then((response) => response.json())
		.then((response) => setData(response))
		.catch((err) => setError(err))
		.finally(() => setIsPending(false))
	}, [url, data, error, isPending])
  
	useEffect(() => {
	  if (immediate) {
		console.log("immediate in")
		executeFetch()
	}
	}, [executeFetch, immediate])
	return { data, error, isPending, executeFetch }
  }