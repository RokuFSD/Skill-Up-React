# AlkyBank

## eWallet para agregar cargas, gastos y envios de dinero.

</br>

### Objetivo:

- Desarrollar una Wallet que le permita a los clientes del banco, realizar transacciones de forma virtual y facilitar la operaciones entre personas.
  </br>
- Esta consta de autenticación,
  carga de saldo, gastos, balance, movimientos y envío de dinero.

### Requerimientos:

Login
❖ Una vez logueado permite ver cargas de saldo, balance, gastos, etc
❖ En caso de no tener cuenta, permitir crearle una.
❖ En ambos casos los datos tienen que estar persistidos en el LocalStorage
(Vuex)

Carga de saldo
❖ Permitir realizar una carga de saldo en mi cuenta
➢ Las cargas deben tener un monto mayor que cero
➢ Las cargas deben tener un concepto (texto corto)
➢ Las cargas deben tener una fecha.
➢ Las cargas deben especificar una moneda
➢ Solo se puede editar el concepto de una carga

Gastos
❖ Permitir cargar pagos para poder llevar control de mis egresos de dinero
➢ Los pagos deben tener concepto (texto corto)
➢ Los pagos deben tener un monto mayor que cero
➢ Los pagos deben tener una fecha
➢ Los pagos deben especificar una moneda
➢ Solo se puede editar el concepto de un pago.

Balance
❖ Poder obtener mi balance para saber cuánto dinero tengo en mi cuenta
➢ Se debe mostrar balance como la suma de todos las cargas menos la
suma de todos los pagos
➢ Se debe mostrar los balances de ambas cuentas

Movimientos
❖ Listar todos mis movimientos para llevar control de mis ingresos y egresos
de dinero
➢ Se deben listar todos los movimientos desde el más nuevo al más
viejo
❖ Opcional:
➢ Se deben paginar cada 10 movimientos.
➢ Se debe poder filtrar por carga/pago

➢ Se debe poder filtrar por concepto
➢ Se debe poder filtrar por moneda

Envío de dinero
❖ Permitir enviar dinero a otro usuario para que tenga más ingresos
➢ Desde la lista de usuarios, debe poder seleccionar un usuario y desde
ahí enviarle dinero. Igual que como se carga un gasto.
➢ Al enviar dinero, el dinero aparecerá como un gasto cualquiera, pero
NO puede ser modificado
➢ Al enviar dinero, ese dinero aparecerá en la lista de ingresos del
usuario al que se lo envíe. NO puede ser modificado
➢ Solo se puede enviar plata en pesos

## Tecnologías aplicadas:

### Frontend:

![](https://www.arsys.es/blog/file/uploads/2017/04/React.jpg)
![](https://hybridheroes.de/blog/content/images/2022/03/redux-toolkit-1400.jpg)
![](https://reactrouter.com/ogimage.png)
![](https://miro.medium.com/max/712/0*QXkyD4rFK7ivYf9-.png)

## Deployment:

- Netlify: https://aesthetic-sundae-30a624.netlify.app/

## Colaboradores:

- Emiliano Ruiz Dias (Front-end Developer)
- Nahuel Demian Fanego Paz (Front-end Developer)

## Demo:

https://user-images.githubusercontent.com/91083824/202033556-96fca056-49b4-4301-a182-3eb14919da4d.mp4


https://user-images.githubusercontent.com/91083824/202033847-c14c3d06-e2a6-471d-a3a6-8ce032a94d92.mp4

