import { useState, useEffect } from "react";

const useFetch = (apiFunction, dependency = []) => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {

                setLoading(true);

                const result =
                    await apiFunction();

                setData(result);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, dependency);

    return {
        data,
        loading,
        error
    };

};

export default useFetch;