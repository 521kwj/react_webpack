
const generatorPromise = () => {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('promise')
        },1000)
    })
}
export default generatorPromise
