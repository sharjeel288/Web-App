import axioss from 'axios';

const instance=axioss.create({
    baseURL:'https://burger-builder-react-d12cb.firebaseio.com'
})

export default instance