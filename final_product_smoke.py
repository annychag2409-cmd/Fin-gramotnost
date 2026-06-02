
import urllib.request


API_ROOT = "http://127.0.0.1:5000/api"


def check_endpoint(path):
    with urllib.request.urlopen(f"{API_ROOT}{path}", timeout=5) as response:
        return response.status == 200


def run_product_smoke_check():
    return {
        "health": check_endpoint("/health"),
        "deposits": check_endpoint("/deposits"),
        "savings": check_endpoint("/savings"),
    }


if __name__ == "__main__":
    print(run_product_smoke_check())
