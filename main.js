var isResult = false

function calc(sign){
  if(isResult){
    // =演算子を押した後かどうかの判断して何か入力した時に0に戻す
    document.form.text.value = '0'
    isResult = false
  }
  if(sign == ''){
    // 空白ボタン処理
    return
  }
  else if(sign == '+/-'){
    // ±変換処理
    if((document.form.text.value.slice(-1) == '÷') || (document.form.text.value.slice(-1) == '×') ||
    (document.form.text.value.slice(-1) == '-') || (document.form.text.value.slice(-1) == '+')){
      var plusminus1 = -1 * eval(document.form.text.value.slice(0, -1))
      document.form.text.value += plusminus1
    }
    else{
      var plusminus2 = -1 * document.form.text.value.slice(-1)
      document.form.text.value = document.form.text.value.slice(0, -1) + plusminus2
    }
  }
  else if(sign === '='){
    try{
      // =を押したときの正常処理
      // ÷と×は正規表現ではないので変換
      document.form.text.value = document.form.text.value.replace('÷', '/')
      document.form.text.value = document.form.text.value.replace('×', '*')

      if((document.form.text.value.slice(-1) == '/') || (document.form.text.value.slice(-1) == '*') ||
      (document.form.text.value.slice(-1) == '-') || (document.form.text.value.slice(-1) == '+')){
        // 計算式の最後が四則演算記号で終わる場合、その直前の式を計算してそれを後において計算する
        var end = eval(document.form.text.value.slice(0, -1))
        document.form.text.value = eval(document.form.text.value + end)
      }
      else{
        document.form.text.value = eval(document.form.text.value)
      }

      isResult = true
    }
    catch{
      // =を押したときのエラー処理
      document.form.text.value = "error"
    }
  }
  else if(sign === 'C'){
    // Cを押したときの処理
    document.form.text.value = '0'
  }
  else if(document.form.text.value === '0'){
    if(!isNaN(sign)){
      // 0だった場合に数字を打ち込んでも0何とはならずに数字が入力される処理
      document.form.text.value = sign
    }
    else{
      document.form.text.value += sign
    }
  }
  else{
    if((/\W+$/.test(document.form.text.value)) && (/\W+$/.test(sign))) {
      // 連続した記号は後に選択した記号にする処理
      // 小数点もこれで処理
      document.form.text.value = document.form.text.value.slice(0, -1)
      document.form.text.value += sign
    }
    else if(document.form.text.value == 'error'){
      // エラーが出た後の処理
      if(/\W+$/.test(sign)){
        // 記号ならば0と記号を組み合わせて表示
        document.form.text.value = '0'　+ sign
      }
      else{
        document.form.text.value = sign
      }
    }
    else{
      // 数字はそのまま入力
      document.form.text.value += sign
    }
  }
}