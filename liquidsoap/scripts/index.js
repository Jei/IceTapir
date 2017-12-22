
module.exports = {

  default: (args) => {
    return `
    # SOURCES
    main = playlist(\\"${args.playlistPath}\\", reload_mode=\\"watch\\")

    # WRAPPING
    main = skip_blank(main)
    main = mksafe(main)

    # LOGGING
    set(\\"log.file.path\\", \\"${args.logPath}\\")

    # OUTPUTS
    output.icecast(%vorbis, host=\\"${args.host}\\", port=${args.port}, password=\\"${args.sourcesPassword}\\", mount=\\"${args.mount}\\", main)
    `
  },

};