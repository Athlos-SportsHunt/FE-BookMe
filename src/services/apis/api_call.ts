
export async function handle_apicall(URL: string) {
    try {
        const response = await fetch(URL, {
            credentials: "include"
        });  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            success: true,
            data: data,
            error: null
        };
    } catch (error) {
        console.error("Error fetching featured venues:", error);
        return {
            success: false,
            data: null,
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
        };
    }
}