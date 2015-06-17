//{ KeyID: 86, KeyName: "Sigortalı Telefon Türü", KeyValueList: ["Is"] },
//{ KeyID: 88, KeyName: "Sigortalı Telefonu Alan Kodu", KeyValueList: ["212"] },
//{ KeyID: 89, KeyName: "Sigortalı Telefonu Numarası", KeyValueList: ["3452445"] },


//{ KeyID: 91, KeyName: "Sigortalı Mahalle", KeyValueList: ["Acerpro mh."] },
//{ KeyID: 92, KeyName: "Sigortalı Cadde", KeyValueList: ["Test cd."] },
//{ KeyID: 93, KeyName: "Sigortalı Sokak", KeyValueList: ["Teknopark sk."] },
//{ KeyID: 94, KeyName: "Sigortalı Apartman", KeyValueList: ["c1."] },
//{ KeyID: 95, KeyName: "Sigortalı Bina No", KeyValueList: ["208"] },
//{ KeyID: 96, KeyName: "Sigortalı Daire No", KeyValueList: ["1"] },

var param = [
//{KeyID : 113 , KeyName : "Acente ID",KeyValueList :["3"]},
//{KeyID : 114 , KeyName : "Acente Kullanıcı Adı",KeyValueList :["arkas"]},
//{KeyID : 115 , KeyName : "Acente Şifre",KeyValueList :["test_arkas_657"]},

//----------------------------------- sabit ---------------------------------------
{ KeyID: 125, KeyName: "Ürün Branşı", KeyValueList : ["1"] },

//------------------------- sigortalı bilgileri -----------------------------------
{ KeyID: 3,  KeyName: "Sigortalı Türü", KeyValueList: [kpd.plakaData.sigortaliTuru] },
{ KeyID: 1,  KeyName: "Sigortalı TC Kimlik No", KeyValueList: [kpd.plakaData.sigortaliTck] },
{ KeyID: 6,  KeyName: "Sigortalı İkametgah İli", KeyValueList: [ kpd.sigortaliIl.ParameterValue ] }, 
{ KeyID: 7,  KeyName: "Sigortalı İkametgah İlçesi", KeyValueList: [ kpd.sigortaliIlce.ParameterValue ] },
{ KeyID: 21, KeyName: "Sigortali Email Adresi", KeyValueList: [ user.data.email ] },
{ KeyID: 28, KeyName: "Sigortalı Mesleği", KeyValueList: [kpd.meslek.ParameterValue] },

//---------------------------------------- araç -----------------------------------
{ KeyID: 25 ,KeyName: "Araç Model Yılı",KeyValueList :[kpd.aracYili]},
{ KeyID: 26, KeyName: "Araç Motor No", KeyValueList: [kpd.motorNumarasi] },
{ KeyID: 27, KeyName: "Araç Şasi No", KeyValueList: [kpd.sasiNumarasi] },
{ KeyID: 37, KeyName: "Plakasız Araç Mı", KeyValueList: [kpd.plakaDurumu.value ? "H" : "E"] },
{ KeyID: 38, KeyName: "Araç Kullanım Şekli", KeyValueList: [kpd.aracSinifi.parameterValue] },
{ KeyID: 39, KeyName: "Araç Alt Kullanım Şekli", KeyValueList: [kpd.aracAltSinifi.parameterValue] },
{ KeyID: 142, KeyName: "Trafige Çıkış Tarihi", KeyValueList: [kpd.trafigeCikisTarihi] },
{ KeyID: 43, KeyName: "Araç Tescil Tarihi", KeyValueList: [kpd.tescilTarihi] },

//---------------------------------------- diğer -----------------------------------
{ KeyID: 97 , KeyName: "Asbis No Mu",KeyValueList :[kpd.asbisNoMu ? "E" : "H"]},
{ KeyID: 99, KeyName: "Tescil Serki Kod", KeyValueList: [kpd.tescilSeriKod] },
{ KeyID: 100, KeyName: "Tescil Seri No", KeyValueList: [kpd.tescilSeriNumarasi] },

// ----------------------------- ek teminatlar -----------------------------------------
{ KeyID: 8, KeyName: "Daha Sonradan Uygulanan Ses Sistemi Var Mı", KeyValueList: [kpd.sesSistemi ? "E" : "H"] },
{ KeyID: 9, KeyName: "Daha Sonradan Uygulanan Görüntü Sistemi Var Mı", KeyValueList: [kpd.goruntuSistemi ? "E" : "H"] },
{ KeyID: 14, KeyName: "Daha Sonradan Uygulanan Ek Aksesuar Var Mı", KeyValueList: [kpd.digerAksesuar ? "E" : "H"] },
{ KeyID: 146, KeyName: "Operasyonel Kiralık", KeyValueList: [kpd.operasyonelKiralik ? "E" : "H"] },
{ KeyID: 29, KeyName: "Araç LPG li mi", KeyValueList: [kpd.lpgliArac] },
{ KeyID: 124, KeyName: "Kiralık Araç Mı", KeyValueList: ["H"] },

{ KeyID: 144, KeyName: "Hasarsızlık Koruma Teminatı", KeyValueList: [kpd.hasarsizlikTeminati] },
{ KeyID: 4, KeyName: "Plaka İl Kodu", KeyValueList: [kpd.plakaData.plakaIl.parameterValue] },
{ KeyID: 5, KeyName: "Plaka",KeyValueList :[kpd.plakaData.plaka]},
{ KeyID: 17, KeyName: "IMM Limiti", KeyValueList: [kpd.iim] },
{ KeyID: 18, KeyName: "FK Limiti", KeyValueList: [kpd.ferdiKaza] },
{ KeyID: 23, KeyName: "Araç Marka Kodu", KeyValueList: [kpd.aracMarkasi.parameterValue] },

{ KeyID: 126, KeyName: "Sigorta Şirketi", KeyValueList: ["0"] }, 
{ KeyID: 143, KeyName: "Kaza Destek Teminatı", KeyValueList: ["H"] }, 
{ KeyID: 19, KeyName: "Poliçe Başlangıç Tarihi", KeyValueList: ["22.12.2014"] },
{ KeyID: 20, KeyName: "Poliçe Bitiş Tarihi", KeyValueList: ["22.12.2015"] },
{ KeyID: 24, KeyName: "Araç Tip Kodu", KeyValueList: ["220"] },
{ KeyID: 30, KeyName: "Eski Poliçesi Var mı", KeyValueList: ["H"] },
{ KeyID: 145, KeyName: "Kullanım ve gelir kaybı teminatı", KeyValueList: ["H"] },
{ KeyID: 162, KeyName: "HDI indirim oranı yüzde olarak", KeyValueList: ["0"] },
{ KeyID: 22, KeyName: "Araç Bedeli", KeyValueList: ["85530"] },
{ KeyID: 110, KeyName: "Kilit Sistemi Teminatı", KeyValueList: ["E"] },
{ KeyID: 111, KeyName: "Anahtar ile Çalınma Teminatı", KeyValueList: ["E"] },
{ KeyID: 112, KeyName: "Tedavi Masrafları Teminatı", KeyValueList: ["E"] },
{ KeyID: 135, KeyName: "Sağlık Teminatı", KeyValueList: ["H"] },
{ KeyID: 45, KeyName: "Yurt Dışı Teminatı", KeyValueList: ["H"] },
{ KeyID: 123, KeyName: "Araç Toplam Koltuk Sayısı", KeyValueList: ["5"] },


//-----------------------------------------------------------------------------------
{ KeyID: 42, KeyName: "Araç Kullanım Türü", KeyValueList: ["1"] },
{ KeyID: 44, KeyName: "Yolcu Sayısı", KeyValueList: [kpd.kisiSayisi] },

{ KeyID: 241, KeyName: "Ürün", KeyValueList: ["H"] }
];