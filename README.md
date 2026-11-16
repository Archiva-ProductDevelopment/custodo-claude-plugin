# Custodo

![Custodo](assets/logo.png)

Custodo collega Claude all'archivio documentale e al back office della tua
organizzazione: documenti, email e PEC, attività, scadenze, CRM, note spese,
approvazioni, firme e analisi. Claude usa i moduli e i permessi del tuo account.
Il plugin comprende una connessione MCP remota e le istruzioni per lavorare in
Custodo e rispondere alle domande sul suo utilizzo.

## Copertura degli strumenti

Il file `.mcp.json` collega il plugin a **https://api.custodo.ai/mcp**, che
fornisce il catalogo MCP completo consentito all'account collegato. Gli strumenti
vengono scoperti dal server dopo l'autenticazione: non sono incorporati uno per
uno nel file ZIP. I pochi nomi nella skill e gli esempi sotto non sono un elenco
esaustivo e non limitano le operazioni disponibili.

Il catalogo comprende gli strumenti disponibili per Archivio, Conservazione a
norma, Anagrafiche, Tabelle, Email e PEC, WhatsApp, Protocolli, Flussi, Attività,
Checklist, Calendario, CRM, Note spese, Timbratura, Firme, Raccolta documenti,
Condivisione documentale, Integrazioni, Business Intelligence, Ordini,
Contabilità, Magazzino, Attrezzature, Fatturazione, Bacheca e Notifiche, oltre agli
strumenti della piattaforma. La disponibilità effettiva dipende dai moduli
attivati, dalle funzionalità del piano, dai permessi e dal consenso OAuth.
Un collegamento in sola lettura mostra un sottoinsieme degli strumenti.

Quattro operazioni di **Agenti AI** sono escluse dal server MCP per scelta del
prodotto: `agenti_list`, `agenti_run`, `agenti_list_runs` e `agenti_get_run`.
Il plugin non le può abilitare. Per vedere gli strumenti realmente collegati,
apri il connettore Custodo e le sue autorizzazioni agli strumenti in Claude;
l'elenco delle skill del plugin è distinto dal catalogo degli strumenti MCP.

## Installazione

1. In Claude, apri **Customize → Plugins → Add → Upload plugin** e seleziona
   il file ZIP del plugin.
2. Apri la scheda **Connectors** del plugin Custodo e collega Custodo.
3. Accedi con il tuo account Custodo nella pagina di autenticazione. Nel consenso
   scegli le organizzazioni autorizzate e se consentire la sola lettura.
4. Apri una conversazione e chiedi, per esempio: «Quali attività sono scadute nella
   mia organizzazione e chi deve occuparsene?».

Serve un account Custodo attivo. La disponibilità dei plugin e dei connettori
dipende dal piano e dalle impostazioni di Claude. Su Team ed Enterprise, il
proprietario dell'organizzazione può dover aggiungere il connettore prima che i
membri possano collegare il proprio account.

In Claude Code puoi caricare la cartella estratta per una sessione:

```bash
claude --plugin-dir /percorso/alla/cartella/custodo-claude
```

Completa l'autenticazione del server Custodo da `/mcp` quando richiesta. La skill
è disponibile come `/custodo:custodo-workspace`.

## Esempi

- «Trova le fatture di acquisto dell'ultimo trimestre del fornitore che ti indico.»
- «Quali scadenze cadono tra oggi e la fine del mese?»
- «Mostrami attività scadute e responsabili.»
- «Quanti documenti abbiamo archiviato per tipo negli ultimi 12 mesi?»
- «Come si presenta la pipeline commerciale per fase e valore?»
- «Come si collega una casella PEC in Custodo?»

Le risposte possono includere schede interattive e collegamenti ai record,
secondo il supporto dell'app Claude utilizzata. Le azioni restano soggette ai
permessi, ai controlli e al registro attività di Custodo. Puoi revocare il
consenso da Custodo, in **Integrazioni → Client OAuth**.

## Dati e connessioni

La connessione dichiarata è **https://api.custodo.ai/mcp**, con trasporto HTTP e
autenticazione OAuth tramite le pagine di Custodo. Le richieste e gli argomenti
necessari alle operazioni vengono inviati a Custodo; i risultati autorizzati
vengono restituiti a Claude. Possono contenere dati personali, documenti, testi
di posta e altri dati aziendali, in base alle richieste e ai permessi.

Questo pacchetto contiene Markdown, JSON e il logo. Non esegue programmi locali,
non installa dipendenze, non include credenziali e non aggiunge servizi di
telemetria. La conservazione dei dati nel servizio Custodo è disciplinata dalla
sua informativa privacy e dai termini. L'utilizzo e la conservazione delle
conversazioni in Claude dipendono dalle condizioni e dalle impostazioni del tuo
account Anthropic. Le operazioni richieste, come l'invio di posta o una firma,
possono utilizzare i servizi che la tua organizzazione ha collegato a Custodo.

- [Documentazione e assistenza](https://custodo.ai/assistenti-ai#assistenza)
- [Informativa privacy](https://custodo.ai/privacy)
- [Termini di servizio](https://custodo.ai/termini)
- Contatto: info@custodo.ai

## English

Custodo connects Claude to your organisation's document archive and back office.
Search documents, email and PEC; review tasks and deadlines; work with CRM,
expenses, approvals, signatures and analytics, within your own permissions.
An active Custodo account is required. The plugin works in Italian and English.

The `.mcp.json` file connects to **https://api.custodo.ai/mcp**, which supplies
the complete MCP catalogue allowed for the connected account. Tools are
discovered from the server after authentication rather than embedded individually
in the ZIP. The skill's named tools are examples, not an allow-list. All modules
listed above are covered where their MCP tools are available. Enabled modules,
plan features, permissions and OAuth consent determine the actual visible tools;
a read-only grant exposes a subset. The server deliberately excludes four AI
agent operations: `agenti_list`, `agenti_run`, `agenti_list_runs` and
`agenti_get_run`. A plugin's skills list is separate from its connector's tools
list. Inspect Custodo's connector tool permissions in Claude to see the tools
loaded for your account.

To install, open **Customize → Plugins → Add → Upload plugin** in Claude and
upload this ZIP. Open the plugin's **Connectors** tab, connect Custodo and sign
in through Custodo's OAuth flow. Choose the organisations and read-only access
on the consent screen. Your Claude plan or organisation may restrict plugin or
connector access. On Team and Enterprise, an Owner may need to add the connector
before members can connect their own accounts.

For Claude Code, load the extracted folder with `claude --plugin-dir`, then use
`/mcp` to authenticate if prompted. Try “Show overdue tasks and their owners”,
“Which deadlines fall due this month?”, “Show the sales pipeline by stage”, or
“How do I connect a PEC mailbox in Custodo?”.

The only declared connector is **https://api.custodo.ai/mcp**. Necessary tool
arguments are sent to Custodo, and authorised results are returned to Claude.
Results may include personal and business data. The package contains no local
programs, dependency installations, credentials or added telemetry. Custodo's
privacy policy and service terms govern its data retention; Anthropic's terms
and your Claude account settings govern conversations in Claude. Requested
operations may use services your organisation has connected to Custodo.
Revoke the grant in Custodo under **Integrazioni → Client OAuth**.

Published by **Archiva Srl**, VAT IT03237470236. Proprietary; see LICENSE.
