const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

function deleteUser() {
	if (uid == doc.data().user) {
		doc.delete();
	}
	auth.deleteUser(uid);
}
