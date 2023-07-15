function Menu({ onSelectVideo }) {
    /*
        function clickHandler(event) {
            const videoType = event.target.value;
            onSelectVideo(videoType);
        }
    
        return (
            <form onClick={clickHandler}>
                <input type="radio" name="src" value="fast" /> fast
                <input type="radio" name="src" value="slow" /> slow
                <input type="radio" name="src" value="cute" /> cute
                <input type="radio" name="src" value="eek" /> eek
            </form>
        );
    */

    return (
        <form onClick={(event) => onSelectVideo(event.target.value)}>
            <input type="radio" name="src" value="fast" /> fast
            <input type="radio" name="src" value="slow" /> slow
            <input type="radio" name="src" value="cute" /> cute
            <input type="radio" name="src" value="eek" /> eek
        </form>
    );
}

export default Menu;
