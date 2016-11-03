###Пробное приложение "бухгалтерский учет металлоломной площадки"

1. При входе на страницу необходимо авторизоваться. Вначале хватит админа с admin@admin и любого пользователя с любым паролем.
  1. Админ - может редактировать любые данные вручную.
  2. Пользователь с непустым паролем (авторизованный пользователь) может вводить часть данных, остальные данные рассчитываются по простым формулам и доступны только для чтения. Пароль пока не проверяется, проверяется только что он не пустой.
  3. Пользователь с пустым паролем (неавторизованный пользователь) может только просматривать исходные данные.
2. После авторизации есть пункты "ввод данных", "просмотр данных", "сменить пользователя" и "выход".
  1. Ввод данных - поля для ввода данных, часть или все из которых заблокированы в зависимости от прав пользователя. Ниже - табличная часть, где видны ранее введенные данные. Щелчком по строке в этой таблице можно откорректировать конкретные данные.
  2. Просмотр данных - табличная часть с сортировкой и фильтрами по столбцам. Теоретически здесь должны быть графики, но это я пока не потяну.
  3. Смена пользователя - предложение ввести имя и пароль. При старте приложения эта страница должна быть активна при любом выборе пользователя кроме "выход".
  4. Выход - после запроса "вы уверены?" и принудительной записи текущих данных.
3. Структура данных:
  1. номер строки, число, readonly для всех. Служебное поле.
  2. дата, строка либо дата, доступ на запись только авторизованным пользователям и админу, неавторизованным - readonly.
  3. номер машины, строка, доступ на запись только авторизованным пользователям и админу, неавторизованным - readonly.
  4. водитель, строка, доступ на запись только авторизованным пользователям и админу, неавторизованным - readonly.
  5. привезенный вес, число, доступ на запись только авторизованным пользователям и админу, неавторизованным - readonly.
  6. километраж, число, доступ на запись только авторизованным пользователям и админу, неавторизованным - readonly.
  7. время работы установки (металлоломные машины имеют гидравлическую лапу, которой грузят сами себя, которая работает от привода от двигателя), число, доступ на запись только авторизованным пользователям и админу, неавторизованным - readonly.
  8. затраченное топливо, число, доступ на запись только админу, пользователям - readonly. Автоматически считается по формуле __километраж__ * __норматив по расходу топлива для данной машины__ + __время работы установки__ * __норматив по расходу топлива для установки__.
  9. зарплата водителя, число, доступ на запись только админу, пользователям - readonly. Автоматически считается по формуле __привезенный вес__ * __коэффициент__.
  10. расход денег на ходку машины, число, доступ на запись только админу, пользователям - readonly. Автоматически считается по формуле __затраченное топливо__ * __цена д/т на нужный день__ + __зарплата водителя__.
  11. оплата ходки, число, доступ на запись только админу, пользователям - readonly. Автоматически считается по формуле __расход денег на ходку__ округляем вверх до ближайшей сотни.
4. Описанные в предыдущем пункте коэффициенты __расхода топлива на работу установки__, __расхода топлива для данной машины__, __коэффициент зарплаты водителю от тоннажа__ - берем из констант. Коэффициент __цена д/т на нужный день__ теоретически должен браться из независимой структуры, но для простоты для начала тоже можно из константы брать.
