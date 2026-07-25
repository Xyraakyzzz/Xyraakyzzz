const fs = require("fs");
const path = require("path");
const readline = require("readline");
const simpleGit = require("simple-git");
const token = "";
const Web = "https://kyzznekoo.zone.id";

const Languages = [
  { name: "py", code: 'print("Hello, World!")\n' },
  { name: "cpp", code: '#include <iostream>\nint main(){std::cout<<"Hello, World!";}' },
  { name: "c", code: '#include <stdio.h>\nint main(){printf("Hello, World!");}' },
  { name: "go", code: 'package main\nimport "fmt"\nfunc main(){fmt.Println("Hello, World!")}' },
  { name: "rs", code: 'fn main(){println!("Hello, World!");}' },
  { name: "java", code: 'public class Main{public static void main(String[]a){System.out.println("Hello, World!");}}' },
  { name: "kt", code: 'fun main(){println("Hello, World!")}' },
  { name: "swift", code: 'print("Hello, World!")' },
  { name: "dart", code: 'void main(){print("Hello, World!");}' },
  { name: "cs", code: 'using System;class Program{static void Main(){Console.WriteLine("Hello, World!");}}' },
  { name: "php", code: '<?php echo "Hello, World!";' },
  { name: "rb", code: 'puts "Hello, World!"' },
  { name: "lua", code: 'print("Hello, World!")' },
  { name: "sh", code: 'echo "Hello, World!"' },
  { name: "js", code: 'console.log("Hello, World!");' },
  { name: "ts", code: 'console.log("Hello, World!");' },
  { name: "mjs", code: 'console.log("Hello, World!");' },
  { name: "jsx", code: 'export default function App(){return <h1>Hello, World!</h1>}' },
  { name: "tsx", code: 'export default function App(){return <h1>Hello, World!</h1>}' },
  { name: "html", code: '<!DOCTYPE html><h1>Hello, World!</h1>' },
  { name: "css", code: 'body{font-family:sans-serif;}' },
  { name: "scss", code: '$color:#000;body{color:$color;}' },
  { name: "sass", code: '$color:#000\nbody\n  color: $color' },
  { name: "less", code: '@color:#000;body{color:@color;}' },
  { name: "json", code: '{\n  "hello":"world"\n}' },
  { name: "xml", code: '<hello>World</hello>' },
  { name: "yaml", code: 'hello: world' },
  { name: "yml", code: 'hello: world' },
  { name: "toml", code: 'hello = "world"' },
  { name: "ini", code: '[main]\nhello=world' },
  { name: "md", code: '# Hello, World!' },
  { name: "sql", code: 'SELECT "Hello, World!";' },
  { name: "r", code: 'print("Hello, World!")' },
  { name: "jl", code: 'println("Hello, World!")' },
  { name: "scala", code: 'object Main extends App{println("Hello, World!")}' },
  { name: "groovy", code: 'println "Hello, World!"' },
  { name: "pl", code: 'print "Hello, World!\\n";' },
  { name: "pm", code: 'package Hello;1;' },
  { name: "tcl", code: 'puts "Hello, World!"' },
  { name: "erl", code: '-module(main).\n-export([start/0]).\nstart()->io:fwrite("Hello, World!").' },
  { name: "ex", code: 'IO.puts("Hello, World!")' },
  { name: "exs", code: 'IO.puts("Hello, World!")' },
  { name: "clj", code: '(println "Hello, World!")' },
  { name: "fs", code: 'printfn "Hello, World!"' },
  { name: "fsx", code: 'printfn "Hello, World!"' },
  { name: "vb", code: 'Module M\nSub Main()\nConsole.WriteLine("Hello, World!")\nEnd Sub\nEnd Module' },
  { name: "m", code: 'disp("Hello, World!")' },
  { name: "mm", code: '#import <Foundation/Foundation.h>' },
  { name: "zig", code: 'const std=@import("std");pub fn main()!void{std.debug.print("Hello, World!", .{});}' },
  { name: "nim", code: 'echo "Hello, World!"' },
  { name: "cr", code: 'puts "Hello, World!"' },
  { name: "v", code: 'fn main(){println("Hello, World!")}' },
  { name: "pas", code: 'program Hello;begin writeln(\'Hello, World!\');end.' },
  { name: "asm", code: '; Hello World Assembly' },
  { name: "s", code: '; Assembly Source' },
  { name: "dockerfile", code: 'FROM alpine\nCMD echo Hello, World!' },
  { name: "makefile", code: 'all:\n\techo Hello, World!' },
  { name: "cmake", code: 'cmake_minimum_required(VERSION 3.0)' },
  { name: "gradle", code: 'plugins {}' },
  { name: "properties", code: 'hello=world' },
  { name: "tex", code: '\\documentclass{article}\\begin{document}Hello, World!\\end{document}' },
  { name: "texi", code: '@node Top' },
  { name: "csv", code: 'hello,world' },
  { name: "tsv", code: 'hello\tworld' },
  { name: "bat", code: '@echo Hello, World!' },
  { name: "cmd", code: '@echo Hello, World!' },
  { name: "ps1", code: 'Write-Host "Hello, World!"' },
  { name: "coffee", code: 'console.log "Hello, World!"' },
  { name: "elm", code: 'main = text "Hello, World!"' },
  { name: "hs", code: 'main = putStrLn "Hello, World!"' },
  { name: "ml", code: 'print_endline "Hello, World!";;' },
  { name: "mli", code: '(* Hello World *)' },
  { name: "ada", code: 'with Ada.Text_IO;use Ada.Text_IO;procedure Hello is begin Put_Line("Hello, World!");end Hello;' },
  { name: "d", code: 'import std.stdio;void main(){writeln("Hello, World!");}' },
  { name: "hx", code: 'class Main{static function main(){trace("Hello, World!");}}' },
  { name: "sol", code: 'pragma solidity ^0.8.0;' },
  { name: "proto", code: 'syntax="proto3";' },
  { name: "graphql", code: 'type Query{hello:String}' },
  { name: "vue", code: '<template><h1>Hello, World!</h1></template>' },
  { name: "svelte", code: '<h1>Hello, World!</h1>' },
  { name: "astro", code: '---\n---\n<h1>Hello, World!</h1>' },
  { name: "cc", code: '#include <iostream>\nint main(){std::cout<<"Hello, World!";}' },
  { name: "cxx", code: '#include <iostream>\nint main(){std::cout<<"Hello, World!";}' },
  { name: "c++", code: '#include <iostream>\nint main(){std::cout<<"Hello, World!";}' },
  { name: "h", code: '#pragma once' },
  { name: "hh", code: '#pragma once' },
  { name: "hpp", code: '#pragma once' },
  { name: "hxx", code: '#pragma once' },
  { name: "ino", code: 'void setup(){}\nvoid loop(){}' },
  { name: "pyw", code: 'print("Hello, World!")' },
  { name: "pyi", code: 'def hello() -> None: ...' },
  { name: "cjs", code: 'console.log("Hello, World!");' },
  { name: "cts", code: 'console.log("Hello, World!");' },
  { name: "mts", code: 'console.log("Hello, World!");' },
  { name: "bash", code: 'echo "Hello, World!"' },
  { name: "zsh", code: 'echo "Hello, World!"' },
  { name: "fish", code: 'echo "Hello, World!"' },
  { name: "ksh", code: 'echo "Hello, World!"' },
  { name: "awk", code: 'BEGIN { print "Hello, World!" }' },
  { name: "sed", code: 's/.*/Hello, World!/' },
  { name: "lisp", code: '(format t "Hello, World!~%")' },
  { name: "lsp", code: '(format t "Hello, World!~%")' },
  { name: "scheme", code: '(display "Hello, World!")' },
  { name: "scm", code: '(display "Hello, World!")' },
  { name: "rkt", code: '#lang racket\n(displayln "Hello, World!")' },
  { name: "f", code: 'print *,"Hello, World!"' },
  { name: "f77", code: 'print *,"Hello, World!"' },
  { name: "f90", code: 'program hello\nprint *,"Hello, World!"\nend' },
  { name: "f95", code: 'program hello\nprint *,"Hello, World!"\nend' },
  { name: "f03", code: 'program hello\nprint *,"Hello, World!"\nend' },
  { name: "f08", code: 'program hello\nprint *,"Hello, World!"\nend' },
  { name: "for", code: 'print *,"Hello, World!"' },
  { name: "cob", code: 'IDENTIFICATION DIVISION.' },
  { name: "cbl", code: 'IDENTIFICATION DIVISION.' },
  { name: "cpy", code: '* COPYBOOK' },
  { name: "psql", code: 'SELECT \'Hello, World!\';' },
  { name: "mysql", code: 'SELECT "Hello, World!";' },
  { name: "pgsql", code: 'SELECT \'Hello, World!\';' },
  { name: "sqlite", code: 'SELECT "Hello, World!";' },
  { name: "conf", code: '# configuration' },
  { name: "cfg", code: '# configuration' },
  { name: "cnf", code: '# configuration' },
  { name: "env", code: 'HELLO=world' },
  { name: "lock", code: '{}' },
  { name: "mk", code: 'all:\n\techo Hello' },
  { name: "gnumakefile", code: 'all:\n\techo Hello' },
    { name: "bazel", code: '# Bazel' },
  { name: "bzl", code: '# Bazel' },
  { name: "meson", code: 'project(\'hello\', \'c\')' },
  { name: "ninja", code: 'rule cc' },
  { name: "htm", code: '<h1>Hello, World!</h1>' },
  { name: "xhtml", code: '<html></html>' },
  { name: "svg", code: '<svg xmlns="http://www.w3.org/2000/svg"></svg>' },
  { name: "webmanifest", code: '{\n  "name":"Hello"\n}' },
  { name: "ejs", code: '<h1>Hello, World!</h1>' },
  { name: "pug", code: 'h1 Hello, World!' },
  { name: "jade", code: 'h1 Hello, World!' },
  { name: "haml", code: '%h1 Hello, World!' },
  { name: "twig", code: 'Hello {{ name }}' },
  { name: "jinja", code: 'Hello {{ name }}' },
  { name: "jinja2", code: 'Hello {{ name }}' },
  { name: "liquid", code: 'Hello {{ name }}' },
  { name: "hbs", code: '<h1>{{title}}</h1>' },
  { name: "mustache", code: '{{hello}}' },
  { name: "rst", code: 'Hello\n=====' },
  { name: "adoc", code: '= Hello' },
  { name: "asciidoc", code: '= Hello' },
  { name: "org", code: '* Hello' },
  { name: "tf", code: 'terraform {}' },
  { name: "tfvars", code: 'hello = "world"' },
  { name: "hcl", code: 'hello = "world"' },
  { name: "nomad", code: 'job "hello" {}' },
  { name: "http", code: `GET ${Web}/1:1` },
  { name: "rest", code: `GET ${Web}` },
  { name: "diff", code: '--- a/file\n+++ b/file' },
  { name: "patch", code: '--- a/file\n+++ b/file' },
  { name: "vhd", code: 'entity hello is end hello;' },
  { name: "sv", code: 'module hello;endmodule' },
  { name: "svh", code: '`define HELLO' },
  { name: "vlog", code: 'module hello;endmodule' },
  { name: "glsl", code: 'void main(){}' },
  { name: "vert", code: 'void main(){}' },
  { name: "frag", code: 'void main(){}' },
  { name: "geom", code: 'void main(){}' },
  { name: "comp", code: 'void main(){}' },
  { name: "tesc", code: 'void main(){}' },
  { name: "tese", code: 'void main(){}' },
  { name: "wgsl", code: '@compute @workgroup_size(1)\nfn main(){}' },
  { name: "hlsl", code: 'float4 main():SV_Target{return 1;}' },
  { name: "gd", code: 'extends Node' },
  { name: "gdscript", code: 'extends Node' },
  { name: "applescript", code: 'display dialog "Hello, World!"' },
  { name: "ahk", code: 'MsgBox, Hello, World!' },
  { name: "au3", code: 'MsgBox(0,"","Hello, World!")' },
  { name: "gradle.kts", code: 'plugins {}' },
  { name: "pom", code: '<project></project>' },
  { name: "gitignore", code: 'node_modules/\n.env' },
  { name: "gitattributes", code: '* text=auto' },
  { name: "prisma", code: 'generator client { provider = "prisma-client-js" }' },
  { name: "dot", code: 'graph G { A -- B }' },
  { name: "gv", code: 'graph G { A -- B }' },
  { name: "feature", code: 'Feature: Hello World' },
  { name: "gherkin", code: 'Feature: Hello World' },
  { name: "cue", code: 'hello: "world"' },
  { name: "rego", code: 'package hello' },
  { name: "bicep", code: 'resource storage' },
  { name: "qmd", code: '# Hello World' }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(text) {
  return new Promise(resolve => rl.question(text, resolve));
}

function translateError(message = "") {
  switch (true) {
    case message.includes("Could not resolve host"):
      return "Tidak dapat terhubung ke GitHub. Periksa koneksi internet atau DNS Anda.";
    case message.includes("Failed to connect"):
      return "Gagal terhubung ke server GitHub. Pastikan jaringan Anda stabil.";
    case message.includes("Connection timed out"):
      return "Koneksi ke GitHub melebihi batas waktu (timeout).";
    case message.includes("Connection refused"):
      return "Koneksi ke GitHub ditolak oleh server.";
    case message.includes("Network is unreachable"):
      return "Jaringan tidak dapat dijangkau.";
    case message.includes("No route to host"):
      return "Tidak ada jalur jaringan menuju server GitHub.";
    case message.includes("Authentication failed"):
      return "Autentikasi gagal. Periksa kembali Personal Access Token GitHub Anda.";
    case message.includes("Bad credentials"):
      return "Personal Access Token GitHub tidak valid.";
    case message.includes("Invalid username or token"):
      return "Username atau Personal Access Token tidak valid.";
    case message.includes("Support for password authentication was removed"):
      return "GitHub tidak lagi mendukung login menggunakan password. Gunakan Personal Access Token.";
    case message.includes("HTTP Basic: Access denied"):
      return "Akses ditolak. Periksa username atau Personal Access Token.";
    case message.includes("Repository not found"):
      return "Repository tidak ditemukan atau Anda tidak memiliki izin untuk mengaksesnya.";
    case message.includes("remote: Repository not found"):
      return "Repository tujuan tidak ditemukan.";
    case message.includes("not found"):
      return "Data yang diminta tidak ditemukan.";
    case message.includes("src refspec"):
      return "Branch yang ingin dipush tidak ditemukan.";
    case message.includes("couldn't find remote ref"):
      return "Branch pada repository tujuan tidak ditemukan.";
    case message.includes("Updates were rejected"):
      return "Push ditolak karena repository remote memiliki commit yang belum ada di lokal.";
    case message.includes("non-fast-forward"):
      return "Push ditolak karena branch remote lebih baru daripada branch lokal.";
    case message.includes("failed to push some refs"):
      return "Gagal mengirim commit ke repository GitHub.";
    case message.includes("remote origin already exists"):
      return "Remote 'origin' sudah ada.";
    case message.includes("No such remote"):
      return "Remote Git tidak ditemukan.";
    case message.includes("nothing to commit"):
      return "Tidak ada perubahan untuk di-commit.";
    case message.includes("working tree clean"):
      return "Tidak ada perubahan pada repository.";
    case message.includes("index.lock"):
      return "Repository sedang digunakan oleh proses Git lain.";
    case message.includes("SSL"):
      return "Terjadi kesalahan SSL saat menghubungkan ke GitHub.";
    case message.includes("certificate"):
      return "Sertifikat SSL tidak valid atau tidak dipercaya.";
    case message.includes("Permission denied"):
      return "Izin akses ditolak.";
    case message.includes("Access denied"):
      return "Anda tidak memiliki izin untuk melakukan operasi ini.";
    case message.includes("No space left on device"):
      return "Penyimpanan perangkat penuh.";
    case message.includes("Read-only file system"):
      return "Sistem file hanya dapat dibaca.";
    case message.includes("403"):
      return "Akses ditolak oleh GitHub (HTTP 403).";
    case message.includes("401"):
      return "Autentikasi diperlukan (HTTP 401).";
    case message.includes("404"):
      return "Resource GitHub tidak ditemukan (HTTP 404).";
    case message.includes("429"):
      return "Terlalu banyak permintaan ke GitHub. Coba lagi nanti.";
    case message.includes("500"):
      return "Server GitHub sedang mengalami gangguan (HTTP 500).";
    case message.includes("502"):
      return "GitHub mengembalikan Bad Gateway (HTTP 502).";
    case message.includes("503"):
      return "Layanan GitHub sedang tidak tersedia (HTTP 503).";
    case message.includes("504"):
      return "GitHub mengalami Gateway Timeout (HTTP 504).";
    default:
      return message;
  }
}

(async () => {
  if (!token) {
    console.error("❌ Mohon isi GitHub Personal Access Token.")
    process.exit(1);
  }
  const repoUrl = (await question("GitHub Repository URL: ")).trim();
  rl.close();
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/.]+)(?:\.git)?(?:\s+(\d+))?$/);

  if (!match) {
    console.log("❌ Invalid URL. example: <file>.js (RepoUrl) (Sleep Ex: 200)");
    process.exit(1);
  }
  
  const username = match[1];
  const repo = match[2];
  const Sleep = match?.[3] ? Number(match[3]) : undefined;
  console.log("\n===== Repository =====");
  console.log("Username :", username);
  console.log("Repo     :", repo);
  console.log("======================\n");
  const repoPath = path.join(__dirname, repo);
  if (!fs.existsSync(repoPath)) {
    console.log("📥 Cloning repository...");
    const Url = `https://x-access-token:${token}@github.com/${username}/${repo}.git`;
    await simpleGit().clone(Url, repoPath);
  }
  const git = simpleGit(repoPath);
  console.log("🚀 Auto upload started...\n");
  while (true) {
    const Language = Languages[Math.floor(Math.random() * Languages.length)];
    const filename = `${Math.floor(Math.random() * 1e9)}-${Date.now()}-KyxzzCr-.${Language.name}`;
  try {
    fs.writeFileSync(path.join(repoPath, filename), Language.code);
    await git.add(filename);
    await git.commit(`Create ${filename}`);
    const Push = simpleGit(repoPath);
  try {
    await Push.removeRemote("origin");
   } catch (e) {
     throw e;
    }
    await Push.addRemote("origin", `https://${username}:${token}@github.com/${username}/${repo}.git`);
    await Push.push("origin", "main");
    console.log(`✅ Uploaded: ${filename}`);
    } catch (err) {
      const translated = translateError(err.message)
     console.log(`❌ Uploaded: ${filename}`);
     console.error(`✉️ Message: ${translated}`);
     if (translated === "Push ditolak karena repository remote memiliki commit yang belum ada di lokal.") {
        fs.rmSync(repo, { recursive: true, force: true });
        console.log("🗑️ Repository lokal dihapus. Akan clone ulang...");
      }
     console.log("🔄 Retry...");
   }
   
    await new Promise(resolve => setTimeout(resolve, Sleep ?? 1000));
  }
})();
