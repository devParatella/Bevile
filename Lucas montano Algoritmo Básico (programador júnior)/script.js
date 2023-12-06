//Complete the reverseArray function below.
function reverseArray(a) {
    let ponteiroMenor = 0
    let ponteiroMaior = a.length -1
    while (ponteiroMenor < ponteiroMaior) {
        //swap
        let tmp = a[ponteiroMenor]
        a[ponteiroMenor] = a[ponteiroMaior]
        a[ponteiroMaior] = tmp
    }
    
}