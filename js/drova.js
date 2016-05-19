//************************************************
//*******ПЕРЕМЕННЫЕ*******************************
//************************************************
//очистка памяти
//localStorage.clear();

//Общее кол-во бревен в контейнере
var qtyTotal = 0;
var general_qtyTotal = 0;
//Общий объем бревен в контейнере
var valTotal = 0;
var general_valTotal = 0;
//Сумма всех диаметров бревен в контейнере
var diamTotal = 0;
var general_diamTotal = 0;
//Общий средний диаметр по контейнеру
var averDiamTotal = 0;
var general_averDiamTotal = 0;
//-----------------------------------
//localStorage.setItem('general_qtyTotal', 0);
//localStorage.setItem('general_valTotal', 0);
//localStorage.setItem('general_diamTotal',0);
//localStorage.setItem('general_averDiamTotal',0);

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

//сдвиг экрана
var position = 30;
var shift = 50;

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
    qtyTotal = 0;
    valTotal = 0;
    diamTotal = 0;
    averDiamTotal = 0;
    $('#aver_diam').val(0);

}

//Показ сообщений
function errorMessages(message){
    $('.error').text(message).fadeIn().delay(2000).fadeOut();
}

//ВСЕ РАСЧЕТЫ
function Calculation() {
    //выбор длины
    var Lmd = $('#Lmd').val();
    //console.log('Lmd = '+Lmd);
    D = $(current_elem).attr('diam');
    //console.log('\nD = '+D);

    //Расчет объема текущего бревна
    switch (Lmd) {
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
    var sum_diam = 0;
    var temp_diam_total = $('.diam');
    //console.log(temp_var);
    $.each(temp_diam_total, function () {
        var qty = parseInt($(this).val());
        //console.log('qty = '+qty);
        diam_total += qty;
        var current_diam = $(this).attr('diam');
        sum_diam += current_diam * qty;
        //console.log('sum_diam = '+sum_diam);
    });
    //console.log('sum_diam final = ' + sum_diam);
    //console.log('diam_total = ' + diam_total);
    //общее кол-во
    $('#diam_total').val(diam_total.toLocaleString());
    //общий средний диаметр !!!деление на ноль
    //убираем деление на ноль
    var aver_diam = sum_diam/((diam_total)?diam_total:1);
    $('#aver_diam').val(aver_diam.toFixed(3));
    //***************************************
    //ОБЩИЙ ОБЪЕМ
    var val_total = 0;
    var temp_val_total = $('.val');
    //console.log('temp_val_total = '+temp_val_total);
    $.each(temp_val_total, function () {
        var qty = parseInt($(this).val());
        //console.log('qty = '+qty);
        val_total += qty;
    });
    //console.log('val_total = ' + val_total);

    $('#val_total').val(val_total.toLocaleString());
    //***************************************
    //СОХРАНЕНИЕ ДАННЫХ ДЛЯ ВСЕЙ ПАРТИИ
    qtyTotal = diam_total;
    valTotal = val_total;
    diamTotal = sum_diam;
    averDiamTotal = aver_diam;
    //-------------TEST-----------------------------------
    console.log('При наборе с клавиатуры'
        +'\nqtyTotal = ' + qtyTotal
        + '\nvalTotal = ' + valTotal
        + '\ndiamTotal = ' + diamTotal
        + '\naverDiamTotal = ' + averDiamTotal
    );
    //----------------------------------------------------

}

//Сохранение общих данных по всему контейнеру
function saveTotalData()
{
    var result = confirm('Данные будут добавлены к общим данным по контейнеру. Продолжить?');
    if(result)
    {
        //новые значения
        var temp_qtyTotal = parseInt(localStorage.getItem('general_qtyTotal'))   + qtyTotal*1;
        var temp_valTotal = parseInt(localStorage.getItem('general_valTotal'))   + valTotal*1;
        var temp_diamTotal = parseInt(localStorage.getItem('general_diamTotal')) + diamTotal*1;

        localStorage.setItem('general_qtyTotal', temp_qtyTotal);
        localStorage.setItem('general_valTotal', temp_valTotal);
        localStorage.setItem('general_diamTotal', temp_diamTotal);

        general_diamTotal = localStorage.getItem('general_diamTotal');
        general_qtyTotal = localStorage.getItem('general_qtyTotal');
        general_averDiamTotal = general_diamTotal / ((general_qtyTotal)?general_qtyTotal:1);

        localStorage.setItem('general_averDiamTotal', general_averDiamTotal);

        errorMessages('Данные сохранены');

        //-------------TEST-----------------------------------
        general_qtyTotal = localStorage.getItem('general_qtyTotal');
        general_valTotal = localStorage.getItem('general_valTotal');
        general_diamTotal = localStorage.getItem('general_diamTotal');
        general_averDiamTotal = localStorage.getItem('general_averDiamTotal');
        console.log('ПОСЛЕ СОХРАНЕНИЯ'
            + '\n general_qtyTotal = '       + general_qtyTotal
            + '\n general_valTotal = '      + general_valTotal
            + '\n general_diamTotal = '     + general_diamTotal
            + '\n general_averDiamTotal = ' + general_averDiamTotal
        );
        //----------------------------------------------------

        //очищаем данные ввода, чтоб не дублировать
        // ввод одних и тех же данных
        qtyTotal = 0;
        valTotal = 0;
        diamTotal = 0;
        averDiamTotal = 0;

        //заполняем поля общих данных по контейнеру
        $('#diam_total_general').val(general_qtyTotal);
        $('#val_total_general').val(general_valTotal);
        $('#aver_diam_general').val(parseFloat(general_averDiamTotal).toFixed(3));
    }
}

//показ общих данных
function showTotalData()
{
//только если в хранилище есть данные
    if( localStorage.getItem("general_qtyTotal")
        && localStorage.getItem("general_qtyTotal") > 0)
    {
        general_qtyTotal = localStorage.getItem('general_qtyTotal');
        general_valTotal = localStorage.getItem('general_valTotal');
        general_averDiamTotal = parseFloat(localStorage.getItem('general_averDiamTotal'));

        //общее кол-во
        $('#diam_total').val(general_qtyTotal.toLocaleString());
        //общий объем
        $('#val_total').val(general_valTotal.toLocaleString());
        //общий средний диаметр
        $('#aver_diam').val(general_averDiamTotal.toFixed(3));

    }
    else
    {
        errorMessages('Нет данных');
    }
}

//удаление всех общих данных
function deleteTotalData()
{
    var result = confirm('Данные по общей загрузке будут удалены. Продолжить?');
    if(result)
    {
        localStorage.clear();
        localStorage.setItem('general_qtyTotal', 0);
        localStorage.setItem('general_valTotal', 0);
        localStorage.setItem('general_diamTotal',0);
        localStorage.setItem('general_averDiamTotal',0);
        errorMessages('Данные по загрузке удалены');


        //-------------TEST-----------------------------------
        general_qtyTotal = localStorage.getItem('general_qtyTotal');
        general_valTotal = localStorage.getItem('general_valTotal');
        general_diamTotal = localStorage.getItem('general_diamTotal');
        general_averDiamTotal = localStorage.getItem('general_averDiamTotal');
        console.log('ПОСЛЕ ОЧИСТКИ ПАМЯТИ'
            +'\ngeneral_qtyTotal = ' + general_qtyTotal
            + '\ngeneral_valTotal = ' + general_valTotal
            + '\ngeneral_diamTotal = ' + general_diamTotal
            + '\ngeneral_averDiamTotal = ' + general_averDiamTotal
        );
        //----------------------------------------------------
        //заполняем поля общих данных по контейнеру
        $('#diam_total_general').val(0);
        $('#val_total_general').val(0);
        $('#aver_diam_general').val(0);

    }
}

//перемотка к текущему элементу
function scrollVisible(current_elem)
{
    //позиция текущего элемента
    console.log($(current_elem).offset().top);
    var current_position = $(current_elem).offset().top;
    position = current_position - 80;
    $('body,html').animate({
        scrollTop: position
    }, 600);

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

//qtyTotal = 0;
//valTotal = 0;
//diamTotal = 0;

/**
 * Если есть данные в хранилище, инициализируем
 * все переменные сохраненными данными
 */
if( localStorage.getItem("general_qtyTotal")
    && parseInt(localStorage.getItem("general_qtyTotal")) !== 0)
{
    errorMessages('Есть сохраненные данные');
    //сохраненные данные по всей загрузке
    general_qtyTotal = localStorage.getItem('general_qtyTotal');
    general_valTotal = localStorage.getItem('general_valTotal');
    general_diamTotal = localStorage.getItem('general_diamTotal');
    general_averDiamTotal = localStorage.getItem('general_averDiamTotal');

    //заполняем поля общих данных по контейнеру
    $('#diam_total_general').val(general_qtyTotal);
    $('#val_total_general').val(general_valTotal);
    $('#aver_diam_general').val(parseFloat(general_averDiamTotal).toFixed(3));

}
else
{
    errorMessages('Пустой контейнер');
}
//******************************************************
//сохранение общих данных
$('.save-data').click(function(){
    if(qtyTotal > 0)
    {
        saveTotalData();
    }
    else
    {
        errorMessages('Нет данных для сохранения');
    }
});
//******************************************************
//показ общих данных
$('.all-data').click(function(){
    showTotalData();
});
//******************************************************
//удаление общих данных
$('.delete-store').click(function(){
    deleteTotalData();
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
            //console.log('Значение текущего элемента = '+next_elem.val());

            //переназначаем текущий элемент
            current_elem = next_elem;
            //focus on current_elem
            $(current_elem).trigger('focus');

            //когда идем вниз, кнопка "вверх" - default
            $('.prev').css('color','green');

            //сброс нового кол-вы для след. поля
            newFieldVal = '';

            //позиция текущего элемента
            scrollVisible(current_elem);
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
            //console.log('Значение текущего элемента = '+next_elem.val());

            //переназначаем текущий элемент
            current_elem = next_elem;
            //focus on current_elem
            $(current_elem).trigger('focus');

            //когда идем вверх, кнопка "вниз" - default
            $('.next').css('color','green');

            //сброс нового кол-вы для след. поля
            newFieldVal = '';

            //позиция текущего элемента
            scrollVisible(current_elem);
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

