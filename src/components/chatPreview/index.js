import chatPreview from './chatPreview.hbs'
import './chatPreview.scss'

export default (title, lastMsg, time, number, iconSrc) => {
    return chatPreview({title, lastMsg, time, number, iconSrc});
};