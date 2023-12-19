export default class Backend {
    public static async getDate(): Promise<string> {
        const res: Response = await fetch('http://127.0.0.1:8000/test/date', {
            method: 'GET'
        });
        console.log(res);
        const date = await res.json();
        return date.date;
    }

    public static async echo(text: string) {
        const res: Response = await fetch('http://127.0.0.1:8000/test/echo', {
            method: 'POST',
            body: JSON.stringify({
                'text': text
            })
        });
    }
}
