import argparse
from . import database


def main():
    parser = argparse.ArgumentParser(description='Manage your mineral collection')
    subparsers = parser.add_subparsers(dest='command')

    # Initialize database
    subparsers.add_parser('init', help='Initialize the minerals database')

    # Add mineral
    add_parser = subparsers.add_parser('add', help='Add a mineral')
    add_parser.add_argument('name')
    add_parser.add_argument('--color')
    add_parser.add_argument('--location')
    add_parser.add_argument('--notes')

    # List minerals
    subparsers.add_parser('list', help='List minerals')

    # Delete mineral
    delete_parser = subparsers.add_parser('delete', help='Delete a mineral by ID')
    delete_parser.add_argument('id', type=int)

    # Search minerals
    search_parser = subparsers.add_parser('search', help='Search minerals by name')
    search_parser.add_argument('term')

    args = parser.parse_args()
    if args.command == 'init':
        database.initialize_db()
        print('Database initialized.')
    elif args.command == 'add':
        database.add_mineral(args.name, args.color, args.location, args.notes)
        print('Mineral added.')
    elif args.command == 'list':
        rows = database.list_minerals()
        for row in rows:
            print(f"{row[0]}: {row[1]} | Color: {row[2]} | Location: {row[3]} | Notes: {row[4]}")
    elif args.command == 'delete':
        database.delete_mineral(args.id)
        print('Mineral deleted.')
    elif args.command == 'search':
        results = database.search_minerals(args.term)
        for row in results:
            print(f"{row[0]}: {row[1]} | Color: {row[2]} | Location: {row[3]} | Notes: {row[4]}")
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
