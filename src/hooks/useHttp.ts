import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const request = useCallback(
        async (url: string, method = "GET", body: any = null, headers: any = {}) => {
            setLoading(true);
            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers["Content-Type"] = "application/json";
                }


                const response = await fetch(url, { method, body, headers, credentials: url.includes('cc-web-api') ? 'include' : 'same-origin' });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Что-то пошло не так");
                }

                setLoading(false);

                return data;
            } catch (e) {
                setLoading(false);
                setError(e);
                throw e;
            }
        },
        []
    );

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};
