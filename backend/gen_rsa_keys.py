# /// script
# dependencies = [
#   "cryptography",
# ]
# ///


from pathlib import Path

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa


def gen_pair(path: Path):
    """gen rsa pair for path folder
    Args:
        path (Path): folder for keys
    """
    path.mkdir(parents=True, exist_ok=True)
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    (path / "private.pem").write_bytes(
        private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption(),
        )
    )
    public_key = private_key.public_key()
    (path / "public.pem").write_bytes(
        public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        )
    )

    print(f"Ключи успешно созданы: {path}")


def main():
    gen_pair(Path(__file__).parent / "src" / "crypt" / "access")
    gen_pair(Path(__file__).parent / "src" / "crypt" / "refresh")


if __name__ == "__main__":
    main()
