import Axios from 'axios'

export const getQuestionsFromDB = async (URL: string) => {
    try {
        const res = await Axios.get(URL);
        const questions: any[] = [];
        const userData: {} = {
            userName: res.data.items[0].owner.display_name,
            reputation: res.data.items[0].owner.reputation,
            avatar: res.data.items[0].owner.profile_image
        }
        for (let question of res.data.items) {
            questions.push({
                answerCount: question.answer_count,
                creationDate: question.creation_date,
                title: question.title,
                totalViews: question.view_count,
                isAnswered: question.is_answered,
                link: question.link
            });
        }
        let data: {} = { questions, userData }
        return data;
    } catch (err) {
        return "no user found"
    }
};
