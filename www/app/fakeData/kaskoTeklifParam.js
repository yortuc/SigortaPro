
var param = [

    //----------------------------------- sabit ---------------------------------------
    { KeyID: 125, KeyName: "Ürün Branşı", KeyValueList : ["1"] },

    //------------------------------------ araç ----------------------------------------
	{ KeyID: 26,  KeyName: "trMotorNumarasi", KeyValueList : ["1"] },
	{ KeyID: 27,  KeyName: "trSasiNumarasi", KeyValueList : ["1"] },
	// { KeyID: 142, KeyName: "trAracKullanimSekli", KeyValueList : ["1"] },
	{ KeyID: 142, KeyName: "trTrafigeCikisTarihi", KeyValueList : ["1"] },
	{ KeyID: 38,  KeyName: "trTescilTarihi", KeyValueList : ["1"] },
	{ KeyID: 43,  KeyName: "trAracSinifi", KeyValueList : ["1"] },
	{ KeyID: 43,  KeyName: "trAracAltSinifi", KeyValueList : ["1"] },
	{ KeyID: 43,  KeyName: "trAracMarkasi", KeyValueList : ["1"] },
	{ KeyID: 25,  KeyName: "trAracModelYili", KeyValueList : ["1"] },
	{ KeyID: 24,  KeyName: "trAracTipi", KeyValueList : ["1"] },
	{ KeyID: 22,  KeyName: "trAracBedeli", KeyValueList : ["1"] },
	{ KeyID: 44,  KeyName: "trKisiSayisi", KeyValueList : ["1"] },
	{ KeyID: 49,  KeyName: "trOnarimYapilacakServis", KeyValueList : ["1"] },
	{ KeyID: 50,  KeyName: "trYedekParcaTuru", KeyValueList : ["1"] },
	{ KeyID: 158, KeyName: "trKullanimEsasi", KeyValueList : ["1"] },
	{ KeyID: 245, KeyName: "trKasaTipi", KeyValueList : ["1"] },

	//------------------------------------ diğer ----------------------------------------
	{ KeyID: 0,   KeyName: "trYeniPoliceBaslangicTarihi", KeyValueList : ["1"] },
	{ KeyID: 97,  KeyName: "trAsbisNoMu", KeyValueList : ["1"] },
	{ KeyID: 98,  KeyName: "trAsbisNo", KeyValueList : ["1"] },
	{ KeyID: 99,  KeyName: "trTescilSeriKod", KeyValueList : ["1"] },
	{ KeyID: 100, KeyName: "trTescilSeriNo", KeyValueList : ["1"] },

	//-------------------------------- ek teminatlar ------------------------------------
	{ KeyID: 111, KeyName: "trAnahtarIleCalinma", KeyValueList : ["1"] },
	{ KeyID: 112, KeyName: "trTedaviMasraflari", KeyValueList : ["1"] },
	{ KeyID: 0,   KeyName: "trYeniDegerKlozu", KeyValueList : ["1"] },
	{ KeyID: 8,   KeyName: "trSesSistemiVarMi", KeyValueList : ["1"] },
	{ KeyID: 9,   KeyName: "trGoruntuSistemiVarMi", KeyValueList : ["1"] },
	{ KeyID: 104, KeyName: "trKasaSigortasiIsteniyorMu", KeyValueList : ["1"] },
	{ KeyID: 106, KeyName: "trYurtIciTasTemMaliSorumluluk", KeyValueList : ["1"] },
	{ KeyID: 108, KeyName: "trTasinanYukTeminati", KeyValueList : ["1"] },
	{ KeyID: 29,  KeyName: "trLPGliArac", KeyValueList : ["1"] },
	{ KeyID: 101, KeyName: "trEngelliAraciMi", KeyValueList : ["1"] },
	{ KeyID: 124, KeyName: "trKiralikAracMi", KeyValueList : ["1"] },
	{ KeyID: 103, KeyName: "trSurucuKursuAraciMi", KeyValueList : ["1"] },
	{ KeyID: 135, KeyName: "trSaglik", KeyValueList : ["1"] },
	{ KeyID: 136, KeyName: "sağlık teminatı kişi sayısı	", KeyValueList : ["1"] },
	{ KeyID: 110, KeyName: "trKilitSistemi", KeyValueList : ["1"] },
	{ KeyID: 45,  KeyName: "trYurtDisiTeminati", KeyValueList : ["1"] },
	{ KeyID: 46,  KeyName: "yurt dışı teminatı süresi", KeyValueList : ["1"] },
	{ KeyID: 47,  KeyName: "yurtdışı teminatı başlangıç tarihi", KeyValueList : ["1"] },
	{ KeyID: 48,  KeyName: "yurt dışı teminatı bitiş tarihi", KeyValueList : ["1"] },
	{ KeyID: 18,  KeyName: "trFK", KeyValueList : ["1"] },
	{ KeyID: 17,  KeyName: "trIMM", KeyValueList : ["1"] },
	{ KeyID: 14,  KeyName: "trDigerAksesuar", KeyValueList : ["1"] },
	{ KeyID: 42,  KeyName: "trAracKullanimTuru", KeyValueList : ["1"] },
	{ KeyID: 143, KeyName: "trKazaDestek", KeyValueList : ["1"] },
	{ KeyID: 144, KeyName: "trHasarsizlikKoruma", KeyValueList : ["1"] },
	{ KeyID: 146, KeyName: "trOperasyonelKiralik", KeyValueList : ["1"] },
	{ KeyID: 0,   KeyName: "trKullanimGelirKaybi", KeyValueList : ["1"] },
	{ KeyID: 105, KeyName: "kasaBEdeli", KeyValueList : ["1"] },
	{ KeyID: 0,   KeyName: "taşınanYÜkTeminatıTipleri", KeyValueList : ["1"] },
	{ KeyID: 15,  KeyName: "diğer aksesuar açıklama", KeyValueList : ["1"] },
	{ KeyID: 0,   KeyName: "taşınanYÜkTeminatıTipleri", KeyValueList : ["1"] },
	{ KeyID: 16,  KeyName: "diğer aksesuar fiyat", KeyValueList : ["1"] },

	//-------------------------------------- sigortalı ------------------------------------------
	{ KeyID: 196, KeyName: "trMusteriBaglantiTipi", KeyValueList : ["1"] },
	{ KeyID: 197, KeyName: "trMusteriBaglantiliKurum", KeyValueList : ["1"] },
	{ KeyID: 6,   KeyName: "trSliIkametgahIli", KeyValueList : ["1"] },
	{ KeyID: 7,   KeyName: "trSliIkametgahIlcesi", KeyValueList : ["1"] },
	{ KeyID: 160, KeyName: "trEhliyetAlmaYili", KeyValueList : ["1"] },
	{ KeyID: 28,  KeyName: "trSliMeslekFaaliyet", KeyValueList : ["1"] },
	{ KeyID: 161, KeyName: "trYillikKullanimKm", KeyValueList : ["1"] },
	{ KeyID: 160, KeyName: "trEhliyetAlmaYili", KeyValueList : ["1"] },
	// türetilecek
	{ KeyID: 86,  KeyName: "Sigortalı Telefon Türü", KeyValueList: ["Is"] },
	{ KeyID: 88,  KeyName: "Sigortalı Telefonu Alan Kodu", KeyValueList: ["212"] },
	{ KeyID: 89,  KeyName: "Sigortalı Telefonu Numarası", KeyValueList: ["3452445"] }

];

