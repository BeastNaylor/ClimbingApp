const StorageCheck = (id) => {
    let savedClimbs = JSON.parse(localStorage.getItem("climbed"));
    savedClimbs = savedClimbs == null ? [] : savedClimbs;
    return savedClimbs.filter((climbed) => climbed.id === id).length > 0
}

export default StorageCheck