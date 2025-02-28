class NotesDB {
    constructor() {
        this.db = null;
        this.dbName = "pwa-tarefas-db";
        this.dbVersion = 2; // Mudar a versão para forçar atualização
        this.notesStore = "tasks";
        this.init();
    }

    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = event => {
                console.error("Erro ao abrir o banco de dados:", event.target.error);
                reject("Não foi possível abrir o banco de dados");
            };

            request.onsuccess = event => {
                this.db = event.target.result;
                console.log("Banco de dados aberto com sucesso!", this.db);
                resolve(this.db);
            };

            request.onupgradeneeded = event => {
                const db = event.target.result;
                console.log("Atualizando banco de dados...");

                if (!db.objectStoreNames.contains(this.notesStore)) {
                    console.log("Criando Object Store 'tasks'...");
                    const store = db.createObjectStore(this.notesStore, { keyPath: "id", autoIncrement: true });
                    store.createIndex("text", "text", { unique: false });
                }
            };
        });
    }
}
