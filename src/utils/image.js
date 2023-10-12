const createRandomSeed = () => {
    return Math.random().toString(36).substring(2, 15);
}

const createRandomPicsumAddress = () => {
    return `https://picsum.photos/seed/${createRandomSeed()}/1000/1000`;
}

export default createRandomPicsumAddress;