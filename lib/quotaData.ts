export type QuotaRow = {
  province: string; // il
  district: string; // ilçe / "MERKEZ"
  quota: number;
};

export const QUOTA_ROWS: QuotaRow[] = [
  { province: "ADANA", district: "MERKEZ", quota: 2 },
  { province: "ADANA", district: "İMAMOĞLU", quota: 1 },
  { province: "ADANA", district: "KARAİSALI", quota: 1 },
  { province: "ADANA", district: "POZANTI", quota: 1 },

  { province: "AFYONKARAHİSAR", district: "MERKEZ", quota: 1 },
  { province: "AFYONKARAHİSAR", district: "İHSANİYE", quota: 1 },
  { province: "AFYONKARAHİSAR", district: "ŞUHUT", quota: 1 },

  { province: "ANKARA", district: "MERKEZ", quota: 30 },
  { province: "ANKARA", district: "AYAŞ", quota: 1 },

  { province: "ANTALYA", district: "MERKEZ", quota: 3 },
  { province: "ANTALYA", district: "ALANYA", quota: 1 },
  { province: "ANTALYA", district: "KEMER", quota: 1 },

  { province: "ARTVİN", district: "BORÇKA", quota: 1 },
  { province: "AYDIN", district: "KUYUCAK", quota: 1 },
  { province: "BALIKESİR", district: "MARMARA", quota: 1 },
  { province: "BİLECİK", district: "OSMANELİ", quota: 1 },
  { province: "BİTLİS", district: "GÜROYMAK", quota: 1 },
  { province: "BURDUR", district: "GÖLHİSAR", quota: 1 },
  { province: "BURSA", district: "MERKEZ", quota: 3 },
  { province: "ÇANAKKALE", district: "EZİNE", quota: 1 },
  { province: "ÇORUM", district: "ALACA", quota: 1 },

  { province: "DENİZLİ", district: "MERKEZ", quota: 1 },
  { province: "DENİZLİ", district: "KALE", quota: 1 },
  { province: "DENİZLİ", district: "SERİNHİSAR", quota: 1 },

  { province: "DİYARBAKIR", district: "ÇERMİK", quota: 1 },
  { province: "DİYARBAKIR", district: "SİLVAN", quota: 1 },

  { province: "DÜZCE", district: "MERKEZ", quota: 1 },
  { province: "ELAZIĞ", district: "KOVANCILAR", quota: 1 },

  { province: "ERZURUM", district: "MERKEZ", quota: 1 },
  { province: "ERZURUM", district: "HORASAN", quota: 1 },

  { province: "ESKİŞEHİR", district: "MERKEZ", quota: 1 },

  { province: "GAZİANTEP", district: "MERKEZ", quota: 1 },
  { province: "GAZİANTEP", district: "OĞUZELİ", quota: 1 },

  { province: "GİRESUN", district: "GÖRELE", quota: 1 },
  { province: "GİRESUN", district: "TİREBOLU", quota: 1 },

  { province: "HAKKARİ", district: "ŞEMDİNLİ", quota: 1 },

  { province: "HATAY", district: "HASSA", quota: 1 },
  { province: "HATAY", district: "YAYLADAĞI", quota: 1 },

  { province: "ISPARTA", district: "ŞARKİKARAAĞAÇ", quota: 1 },

  { province: "İSTANBUL", district: "MERKEZ", quota: 57 },

  { province: "İZMİR", district: "MERKEZ", quota: 7 },

  { province: "KAHRAMANMARAŞ", district: "ANDIRIN", quota: 1 },

  { province: "KASTAMONU", district: "CİDE", quota: 1 },
  { province: "KASTAMONU", district: "İNEBOLU", quota: 1 },

  { province: "KAYSERİ", district: "İNCESU", quota: 1 },
  { province: "KAYSERİ", district: "SARIZ", quota: 1 },

  { province: "KIRŞEHİR", district: "MUCUR", quota: 1 },

  { province: "KOCAELİ", district: "MERKEZ", quota: 5 },

  { province: "KONYA", district: "MERKEZ", quota: 2 },
  { province: "KONYA", district: "KADINHANI", quota: 1 },

  { province: "MALATYA", district: "DARENDE", quota: 1 },
  { province: "MANİSA", district: "AHMETLİ", quota: 1 },
  { province: "MARDİN", district: "DERİK", quota: 1 },

  { province: "MERSİN", district: "MERKEZ", quota: 1 },

  { province: "MUŞ", district: "BULANIK", quota: 1 },
  { province: "MUŞ", district: "MALAZGİRT", quota: 1 },

  { province: "NEVŞEHİR", district: "AVANOS", quota: 1 },
  { province: "NEVŞEHİR", district: "DERİNKUYU", quota: 1 },

  { province: "ORDU", district: "AYBASTI", quota: 1 },

  { province: "SAKARYA", district: "MERKEZ", quota: 12 },
  { province: "SAKARYA", district: "KAYNARCA", quota: 1 },

  { province: "SİİRT", district: "KURTALAN", quota: 1 },
  { province: "SİNOP", district: "AYANCIK", quota: 1 },
  { province: "SİVAS", district: "MERKEZ", quota: 1 },

  { province: "ŞANLIURFA", district: "HARRAN", quota: 1 },
  { province: "ŞIRNAK", district: "İDİL", quota: 1 },

  { province: "TRABZON", district: "ÇAYKARA", quota: 1 },

  { province: "VAN", district: "ÇALDIRAN", quota: 1 },
  { province: "VAN", district: "ÖZALP", quota: 1 }
];
