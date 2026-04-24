{
  description = "hayao0819.com devshell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs_20
              nodejs_20.pkgs.pnpm
              go
            ];

            shellHook = ''
              echo "hayao0819.com dev environment"
              echo "  node: $(node --version)"
              echo "  pnpm: $(pnpm --version)"
              echo "  go:   $(go version | cut -d' ' -f3)"
            '';
          };
        }
      );
    };
}
