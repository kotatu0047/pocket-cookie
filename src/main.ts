type obj = {
    _a: string,
    _b: string
}

const say = (a: string, b: string): void => {
    const obj: obj = {
        _a: a, _b: b
    };

    const {_a, _b} = obj
    const {...clone} = obj

    console.log(_a, _b);
    console.log(clone)
}

export default say
