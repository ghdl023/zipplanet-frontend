import { searchNickname } from "../../apis/api/user";

function RandomNickName(props) {

    const onClickRandom = async ()=>{
        const ranNick = await searchNickname()
        props.setNewNickname(ranNick['data']);
    }

    return (
        <button onClick={onClickRandom}>랜덤추천</button>
    );
}
export default RandomNickName;