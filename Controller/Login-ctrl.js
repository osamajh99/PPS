const bcrypt = require('bcrypt');
const User = require('../Model/User-model');


//const {login } = require('../utils/login');

exports.loginvalidator = (req, res) => {
  const { Email, Password } = req.body;

  if (!Email(Email)) {
    return res.status(400).json({ message: 'الرجاء إدخال عنوان بريد إلكتروني صالح.' });
  }

  User.findOne({ Email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'لا يوجد مستخدم مسجل بهذا البريد الإلكتروني.' });
      }

      bcrypt.compare(Password, user.Password, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول.' });
        }

        if (!result) {
          return res.status(401).json({ message: 'كلمة المرور غير صحيحة.' });
        }

        res.status(200).json({ message: 'تم تسجيل الدخول بنجاح.' });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول.' });
    });
};
