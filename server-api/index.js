const express = require("express"), cors = require("cors"), router = require("express").Router(), httpStatuses = { success: { ok: 200, created: 201, noContent: 204 }, clientError: { badRequest: 400, notFound: 404, unprocessableEntity: 422 } }, documentation = { GET: { publications: { path: "api/publications", description: "Get all publications." }, publication: { path: "api/publications/{id}", description: "Get the specific publication." } }, POST: { publications: { path: "api/publications", description: "Create a new publication.", params: { available: { title: "Publication's title. <String>", picture: "Publication's picture. <String>", description: "Publication's description. <String>", author: "Publication's author. <String>" }, required: { title: "Publication's title. <String>", picture: "Publication's picture. <String>" } } }, comments: { path: "api/publications/${id}/comments", description: "Create a new comment for its specific publication.", params: { available: { author: "Comment's author. <String>", content: "Comment's content. <String>" }, required: { content: "Comment's content. <String>" } } } }, DELETE: { publications: { path: "api/publications/{id}", description: "Remove the specific publication." } }, PATCH: { likes: { path: "api/publications/{id}/likes", description: "Add a like for its specific publication." } } }, uuid = require("uuid/v1"), docs = (t, i) => { i.status(httpStatuses.success.ok).json(documentation) }, documentationsController = { docs: docs }; class Post { constructor(t = {}) { this.id = uuid(), this.title = t.title, this.picture = t.picture, this.description = t.description, this.author = t.author || "Anônimo", this.likes = 0, this.comments = [], this.publishedAt = Date.now() } } class Comment { constructor(t = {}) { this.author = t.author || "Anônimo", this.content = t.content, this.createdAt = Date.now() } } const publications = [], index = (t, i) => { i.status(httpStatuses.success.ok).json(publications) }, create = (t, i) => { const { title: o, picture: e, description: s, author: n } = t.body; if (!o || !e) return i.status(httpStatuses.clientError.badRequest).json({ error: "'title' and 'picture' are both required." }); const r = new Post({ title: o, picture: e, description: s, author: n }); publications.push(r), i.status(httpStatuses.success.created).json(r) }, show = (t, i) => { const { id: o } = t.params, e = publications.find(t => t.id === o); e ? i.status(httpStatuses.success.ok).json(e) : i.status(httpStatuses.clientError.notFound).json({ error: `Publication with id '${o}' not found.` }) }, destroy = (t, i) => { const { id: o } = t.params, e = publications.findIndex(t => t.id === o); e >= 0 ? (publications.splice(e, 1), i.status(httpStatuses.success.noContent).json()) : i.status(httpStatuses.clientError.notFound).json({ error: `Publication with id '${o}' not found.` }) }, comment = (t, i) => { const { id: o } = t.params, { author: e, content: s } = t.body; if (!s) return i.status(httpStatuses.clientError.badRequest).json({ error: "'content' is required." }); const n = publications.findIndex(t => t.id === o); if (n >= 0) { const t = new Comment({ author: e, content: s }); publications[n].comments.push(t), i.status(httpStatuses.success.created).json(publications[n]) } else i.status(httpStatuses.clientError.notFound).json({ error: `Publication with id '${o}' not found.` }) }, like = (t, i) => { const { id: o } = t.params, e = publications.findIndex(t => t.id === o); e >= 0 ? (publications[e].likes++ , i.status(httpStatuses.success.created).json(publications[e])) : i.status(httpStatuses.clientError.notFound).json({ error: `Publication with id '${o}' not found.` }) }, publicationsController = { index: index, create: create, show: show, destroy: destroy, comment: comment, like: like }, documentationRouter = require("express").Router(), publicationRouter = require("express").Router(); documentationRouter.get("/", documentationsController.docs), publicationRouter.get("/", publicationsController.index), publicationRouter.post("/", publicationsController.create), publicationRouter.get("/:id", publicationsController.show), publicationRouter.delete("/:id", publicationsController.destroy), publicationRouter.post("/:id/comments", publicationsController.comment), publicationRouter.patch("/:id/likes", publicationsController.like), router.use("/", documentationRouter), router.use("/api/publications", publicationRouter); const app = express(), portToListen = 8e3; app.use(cors()), app.use(express.json()), app.use(router), app.listen(8e3, () => console.log("Application listening on port 8000. (http://localhost:8000)"));