//************************************************
//*******ПЕРЕМЕННЫЕ*******************************
//************************************************
//очистка памяти
//localStorage.clear();
//showWebStoreData();

//Диаметр бревна
var D = 0;

//Объем бревна заданного диаметра
var V = 0;

//Массивы соответствий D:V для разных длин
var L_3_8 = [];
var L_5_8 = [];
var LM_2_9 = [];
var LM_3_7 = [];
var LM_3_8 = [];
var LM_3_9 = [];

//для фокусировки на след/пред поле
var on_focus_elem;
//текущщее поле ввода количества
var current_elem;
//изменение кол-ва с пом. вирт. клавиатуры
var newFieldVal = '';


//************************************************
//*******ФУНКЦИИ**********************************
//************************************************

//Сброс всех параметров
function allMelcodrevReset() {
    $('.diam').val('0');
    $('.val').val('0');
    $('#diam_total').val('0');
    $('#val_total').val('0');
    $('#diam8').trigger('focus');
    current_elem = $('#diam8');
    newFieldVal = '';
}
//--------------------------------------

//расчет среднего диаметра
function averDiam() {
    
}


//все расчеты
function Calculation()
{
    //выбор длины
    Lmd = $('#Lmd').val();
    //console.log('Lmd = '+Lmd);
    D = $(current_elem).attr('diam');
    //console.log('\nD = '+D);

    //Расчет объема текущего бревна
    switch (Lmd)
    {
        case 'LM_2_9':
            V = LM_2_9[D];
            break;
        case 'LM_3_7':
            V = LM_3_7[D];
            break;
        case 'LM_3_8':
            V = LM_3_8[D];
            break;
        case 'LM_3_9':
            V = LM_3_9[D];
            break;
    }

    //console.log('V = '+V);
    //получаем текущий id полей количества
    // и общего объема
    var diam_temp = '#diam' + D;
    var val_temp = '#val' + D;
    //console.log('diam_temp = '+diam_temp);
    //console.log('val_temp = '+val_temp);

    $(val_temp).val($(diam_temp).val() * V);
    //***************************************
    //********ОБЩИЕ ДАННЫЕ*******************
    //***************************************
    //ОБЩЕЕ КОЛИЧЕСТВО+СУММА ВСЕХ ДИАМЕТРОВ
    var diam_total = 0;
    //сумма всех диаметров
    var aver_diam = 0;
    var temp_diam_total = $('.diam');
    //console.log(temp_var);
    $.each(temp_diam_total, function(){
        var qty = parseInt($(this).val());
        //console.log('qty = '+qty);
        diam_total += qty;
        var current_diam = $(this).attr('diam');
        aver_diam += current_diam * qty;
        //console.log('aver_diam = '+aver_diam);
    });
    console.log('aver_diam end= '+aver_diam);

    //console.log('diam_total = ' + diam_total);
    //общее кол-во
    $('#diam_total').val(diam_total);
    //общий средний диаметр
    $('#aver_diam').val((aver_diam/diam_total).toLocaleString());
    //***************************************
    //ОБЩИЙ ОБЪЕМ
    var val_total = 0;
    var temp_val_total = $('.val');
    //console.log('temp_val_total = '+temp_val_total);
    $.each(temp_val_total, function(){
        qty = parseInt($(this).val());
        //console.log('qty = '+qty);
        val_total += qty;
    });
    //console.log('val_total = ' + val_total);

    $('#val_total').val(val_total);
    //***************************************
}

//************************************************
//*******ПРОГРАММА********************************
//************************************************
/**
 * при загрузке страницы
 * первый элемент получает фокус
 */
$(window).load(function(){
    $('#diam8').trigger('focus');
    on_focus_elem = $(window.document.activeElement);
    current_elem = on_focus_elem;
});
/**
 * при клике на ячейку она получает фокус
 * и становится current_elem
 */
$('.diam').click(function(){
    $(this).trigger('focus');
    current_elem = $(this);
    //сброс нового кол-вы для след. поля
    newFieldVal = '';
});
//******************************************************
//ВВОД ДАННЫХ С  ВИРТУАЛЬНОЙ КЛАВИАТУРЫ
$(".numbers td").click(function(){

    if( $(this).attr('val') != 'next' &&
        $(this).attr('val') != 'del' &&
        $(this).attr('val') != 'prev'
    )
    {
        //к значению поля добавляем
        // значение кнопки клавиатуры
        newFieldVal += $(this).attr('val');

        //новое значение поля
        $(current_elem).val(newFieldVal)
            .css('color','red')
            .trigger('focus');

        //общие расчеты после
        // каждого изменения поля
        Calculation();

    }
    //перейти на ячейку вниз
    else if($(this).attr('val') == 'next')
    {
        /**
         * Вниз только до диам.38
         */
        if($(current_elem).attr('id') !== 'diam38')
        {
            //следующий элемент
            /**
             * При нажатии фокус переходит к клавиатуре!!!
             * Переназначить фокус!
             */
            var next_elem = $(current_elem).parent().parent().next().find("input:first");
            console.log('Значение текущего элемента = '+next_elem.val());

            //переназначаем текущий элемент
            current_elem = next_elem;
            //focus on current_elem
            $(current_elem).trigger('focus');

            //когда идем вниз, кнопка "вверх" - default
            $('.prev').css('color','green');

            //сброс нового кол-вы для след. поля
            newFieldVal = '';
        }
        else
        {
            /**
             * на последней ячейке кнопку в красный цвет
             * и фокус еа последнем элементе
             */
            $(this).css('color','red');
            $('#diam38').trigger('focus');
        }
    }//перейти на ячейку вниз

    //перейти на ячейку вверх
    else if($(this).attr('val') == 'prev')
    {
        /**
         * Вверх только до диам.8
         */
        if($(current_elem).attr('id') !== 'diam8')
        {
            var next_elem = $(current_elem).parent().parent().prev().find("input:first");
            console.log('Значение текущего элемента = '+next_elem.val());

            //переназначаем текущий элемент
            current_elem = next_elem;
            //focus on current_elem
            $(current_elem).trigger('focus');

            //когда идем вверх, кнопка "вниз" - default
            $('.next').css('color','green');

            //сброс нового кол-вы для след. поля
            newFieldVal = '';

        }
        else
        {
            $(this).css('color','red');
            $('#diam8').trigger('focus');
        }
    }//перейти на ячейку вверх
    //убрать последнюю цифру
    else if($(this).attr('val') == 'del')
    {
        /**
         * только если значение > 0
         */
        if($(current_elem).val() !== 0)
        {
            //console.log('текст последнего элемента - '+ $(current_elem).val());
            //значение поля
            var str = $(current_elem).val();
            /**
             * если удаляем последнее число,
             * значение элемента в "0"
             */
            if(str.length > 1)
            {
                //минус последний символ
                var mines_symbol = str.substring(0, str.length - 1)
                //console.log('текст минус последний символ - '+ mines_symbol);
                //новое значение поля
                $(current_elem).val(mines_symbol).trigger('focus');
                //общие расчеты после
                // каждого изменения поля
                Calculation();
                //новое значение для заполнения поля
                newFieldVal = $(current_elem).val();
            }
            else
            {
                $(current_elem).val(0).trigger('focus');
                //общие расчеты после
                // каждого изменения поля
                Calculation();
                //новое значение для заполнения поля(пустое)
                newFieldVal = '';

            }
        }
    }
});
//******************************************************

//************************************************
//*******РАЗНОЕ***********************************
//************************************************
//сбросить все параметры
$('.reset-melcodrev').click(function(){
    allMelcodrevReset();
});
//сброс при изменении длины
$('#Lmd').change(function(){
    allMelcodrevReset();
});

//очистка поля при наведении
$('.diam').focus(function(){
    var current_data = $(this).val();
    $(this).val(current_data).css('color','red');
});
//значение поля при потере фокуса
$('.diam').blur(function(){
    var current_data = $(this).val();
    $(this).val(current_data).css('color','black');
});

//Скролл вверх
$('.to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});

//отключение двойного клика
$(".numbers td").dblclick(function(){
    $(this).trigger('click');
});

//************************************************

//ТАБЛИЦЫ СООТВЕТСТВИЙ ДИАМЕТРОВ И ОБЪЕМОВ
LM_2_9 = {
    "12":0,
    "14":50,
    "16":66,
    "18":83,
    "20":103,
    "22":125
};
LM_3_7 = {
    "12":48,
    "14":66,
    "16":87,
    "18":100,
    "20":134,
    "22":164
};
LM_3_8 = {
    "8":24,
    "10":34,
    "12":50,
    "14":68,
    "16":90,
    "18":113,
    "20":140,
    "22":170,
    "24":200,
    "26":240,
    "28":270,
    "30":310,
    "32":360,
    "34":410,
    "36":460,
    "38":510,
    "40":550,
    "42":610,
    "44":670,
    "46":730,
    "48":790,
    "50":860,
    "52":940,
    "54":1020,
    "56":1100,
    "58":1180,
    "60":1270,
    "62":1350,
    "64":1440,
    "66":1530,
    "68":1620,
    "70":1710,
    "72":1810,
    "74":1910,
    "76":2020,
    "78":2120,
    "80":2230,
    "82":2350,
    "84":2460,
    "86":2580,
    "88":2700,
    "90":2830,
    "92":2960,
    "94":3080,
    "96":3220,
    "98":3350,
    "100":3490
};
LM_3_9 = {
    "12":0,
    "14":70,
    "16":92,
    "18":117,
    "20":143,
    "22":173
};

L_3_8 = LM_3_8;
L_5_8 = {
    "14":118,
    "16":149,
    "18":186,
    "20":220,
    "22":270,
    "24":320,
    "26":380,
    "28":430,
    "30":500,
    "32":570,
    "34":640,
    "36":710,
    "38":790,
    "40":870,
    "42":960,
    "44":1050,
    "46":1150,
    "48":1250,
    "50":1360,
    "52":1470,
    "54":1590,
    "56":1710,
    "58":1840,
    "60":1970,
    "62":2110,
    "64":2240,
    "66":2360,
    "68":2490,
    "70":2630,
    "72":2770,
    "74":2920,
    "76":3080,
    "78":3260,
    "80":3430,
    "82":3610,
    "84":3780,
    "86":3970,
    "88":4170,
    "90":4370,
    "92":4580,
    "94":4790,
    "96":5010,
    "98":5230,
    "100":5450
};

