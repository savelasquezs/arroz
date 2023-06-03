const functions = require('firebase-functions');

const { ThermalPrinter } = require('node-thermal-printer');
const printer = new ThermalPrinter();

// const admin = require('firebase-admin');
// admin.initializeApp();

// // exports.addAdminRole = functions.https.onCall((data, context) => {
// // 	// get user and add custom claim (admin)
// // 	return admin
// // 		.auth()
// // 		.getUserByEmail(data.email)
// // 		.then((user) => {
// // 			return admin.auth().setCustomUserClaims(user.uid, {
// // 				admin: true,
// // 			});
// // 		})
// // 		.then(() => {
// // 			return {
// // 				message: `Success! ${data.email} se ha creado como admin`,
// // 			};
// // 		})
// // 		.catch((err) => {
// // 			return err;
// // 		});
// // });

exports.printFactura = functions.https.onRequest(async (req, res) => {
	// Collect the receipt data from the request
	const factura = req.body.factura;

	try {
		// Set up printer options
		printer.alignCenter();
		printer.setTypeFontB();

		// Print customer information
		printer.println(`Customer: ${factura.cliente.nombre}`);
		printer.println(`Address: ${factura.cliente.direccion}`);
		printer.println(`Phone: ${factura.cliente.telefono}`);

		// Print food items
		printer.bold(true);
		printer.println('--- Food Items ---');
		printer.bold(false);
		factura.articulos.forEach((item) => {
			printer.tableCustom([
				{ text: item.nombre, align: 'LEFT', width: 0.4 },
				{ text: `$${item.precio}`, align: 'RIGHT', width: 0.2 },
			]);
		});

		// Print total
		printer.println('---');
		printer.bold(true);
		printer.println(`Total: $${factura.total}`);
		printer.bold(false);

		// Print receipt
		printer.cut();
		await printer.execute();

		res.status(200).send('Receipt printed successfully.');
	} catch (error) {
		console.error('Error while printing receipt:', error);
		res.status(500).send('An error occurred while printing the receipt.');
	}
});
