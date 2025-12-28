await setDoc(doc(db, "users", user.uid), {
  firstName: firstName,
  lastName: lastName,
  email: email,
  createdAt: new Date()
});
